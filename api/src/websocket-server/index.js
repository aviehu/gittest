const WebSocket = require('ws');
const wrapWebsocketServer = require('./wrap-websocket-server');

function websocketServer({ socketPingRate = 30000, socketTimeout = 95000, log, ...wsOptions }) {
  const wss = new WebSocket.Server(wsOptions);
  return wrapWebsocketServer(wss, { socketPingRate, socketTimeout, log });
}

module.exports = websocketServer;
