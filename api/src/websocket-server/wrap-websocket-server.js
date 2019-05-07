const _ = require('lodash/fp');
const Ajv = require('ajv');
const configureSocketHandler = require('./socket-handler');

const messageHandlerConfigs = [];

function wrapWebsocketServer(wss, { socketPingRate, socketTimeout, log } = {}) {
  const ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true, // replace missing properties and items with the values from corresponding default keyword
    coerceTypes: true, // change data type of data to match type keyword
    allErrors: true
  });

  const socketHandler = configureSocketHandler(log, messageHandlerConfigs);

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

module.exports = wrapWebsocketServer;
