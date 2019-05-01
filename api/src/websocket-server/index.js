const WebSocket = require('ws');
const wrapWebsocketServer = require('./wrap-websocket-server');

function websocketServer({ socketPingRate = 30000, socketTimeout = 95000, ...wsOptions }) {
  const wss = new WebSocket.Server(wsOptions);
  return wrapWebsocketServer(wss, { socketPingRate, socketTimeout });
}

module.exports = websocketServer;
