const _ = require('lodash/fp');
const EventEmitter = require('events');
const uuidv1 = require('uuid/v1');
const notFound = require('./messages/notFound');
const invalid = require('./messages/invalid');
const ack = require('./messages/ack');
const failed = require('./messages/failed');

function configureSocketHandler(log, messageHandlerConfigs) {
  return function socketHandler(ws) {
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
    ws.sendJson = function sendJson(val) {
      log.info({ websocket: ws.id, json: val, type: 'send' });
      ws.send(JSON.stringify(val));
    };

    _.forEach(({ messageType, options, fn }) => {
      ws.messageEmitter.on(messageType, buildMessageHandler(ws, messageType, options, fn));
    })(messageHandlerConfigs);

    ws.on('message', messageStr => {
      const message = JSON.parse(messageStr);
      log.info({ websocket: ws.id, json: message, type: 'recv' });
      if (message.type == null) {
        invalid(ws, message, [{ message: `should have required property 'type'` }]);
        return;
      }

      if (ws.messageEmitter.listenerCount(message.type) < 1) {
        notFound(ws, message);
        return;
      }

      ws.messageEmitter.emit(message.type, message);
    });

    ws.on('close', () => {
      log.info({ websocket: ws.id, type: 'close' });
    });

    log.info({ websocket: ws.id, type: 'connect' });
    return ws;
  };

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
}

module.exports = configureSocketHandler;
