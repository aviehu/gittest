const _ = require('lodash/fp');
const EventEmitter = require('events');
const uuidv1 = require('uuid/v1');
const Ajv = require('ajv');
const notFound = require('./messages/notFound');
const invalid = require('./messages/invalid');
const ack = require('./messages/ack');
const failed = require('./messages/failed');

const messageHandlerConfigs = [];

function wrapWebsocketServer(wss, { socketPingRate, socketTimeout } = {}) {
  const ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true, // replace missing properties and items with the values from corresponding default keyword
    coerceTypes: true, // change data type of data to match type keyword
    allErrors: true
  });

  wss.on('connection', socketHandler);

  const interval = setInterval(function ping() {
    wss.clients.forEach(ws => {
      if (Date.now() - ws.lastPing > socketTimeout) {
        ws.terminate();
        return;
      }

      ws.ping(_.noop);
    });
  }, socketPingRate);

  wss.on('close', () => {
    clearInterval(interval);
  });

  // eslint-disable-next-line no-param-reassign
  wss.recv = function recv(messageType, options, fn) {
    if (_.isFunction(options)) {
      messageHandlerConfigs.push({ messageType, options: {}, fn: options });
      return;
    }

    const validator = options.schema != null ? ajv.compile(options.schema) : undefined;
    messageHandlerConfigs.push({ messageType, options: { validator, ...options }, fn });
  };

  return wss;
}

function socketHandler(ws) {
  // eslint-disable-next-line no-param-reassign
  ws.id = uuidv1();
  // eslint-disable-next-line no-param-reassign
  ws.lastPing = Date.now();

  ws.on('pong', () => {
    // eslint-disable-next-line no-param-reassign
    ws.lastPing = Date.now();
  });

  // eslint-disable-next-line no-param-reassign
  ws.messageEmitter = new EventEmitter();

  // eslint-disable-next-line no-param-reassign
  ws.sendJson = function(val) {
    ws.send(JSON.stringify(val));
  };

  _.forEach(({ messageType, options, fn }) => {
    ws.messageEmitter.on(messageType, buildMessageHandler(ws, messageType, options, fn));
  })(messageHandlerConfigs);

  ws.on('message', messageStr => {
    const message = JSON.parse(messageStr);
    if (ws.messageEmitter.listenerCount(message.type) < 1) {
      notFound(ws, message);
      return;
    }

    ws.messageEmitter.emit(message.type, message);
  });

  return ws;
}

function buildMessageHandler(ws, messageType, { validator, sendAck }, handler) {
  // eslint-disable-next-line complexity
  return async message => {
    try {
      if (validator && !validator(message)) {
        invalid(ws, message, validator.errors);
        return;
      }

      const response = handler(message, ws);

      if (sendAck) {
        ack(ws, message);
      }

      if (response == null) {
        return;
      }

      const unwrappedResponse = response.then != null ? await response : response;
      if (unwrappedResponse == null) {
        return;
      }

      if (_.isArray(unwrappedResponse)) {
        _.forEach(res => ws.sendJson(res), unwrappedResponse);
        return;
      }

      ws.sendJson(unwrappedResponse);
    } catch (error) {
      failed(ws, message, error);
    }
  };
}

module.exports = wrapWebsocketServer;
