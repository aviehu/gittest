import uuid from 'uuid/v4';
import EventEmitter from 'eventemitter3';

let wrapper;

const cache = {};
function addToCache(key, data) {
  cache[key] = data;
}
function deleteFromCache(key) {
  delete cache[key];
}

function createOrGetSocket(url, onError) {
  return getSocket() || createSocket(url, onError);
}

function getSocket() {
  return wrapper;
}

function createSocketWrapper(socket) {
  const requests = {};

  const handler = new EventEmitter();
  handler.send = function send(message) {
    const id = uuid();

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        handler._handleResponse({ reqId: id, type: 'timeout' });
      }, 3000);

      requests[id] = { resolve, reject, timeoutId };

      socket.send(JSON.stringify({ ...message, id, source: 'PubUi', operatorId: '123' }));
    });
  };

  handler._handleResponse = function _handleResponse(msg) {
    const req = requests[msg.reqId];

    if (!req) {
      console.error(`Couldn't handleResponse for missing request ${msg.reqId}`);
      return;
    }

    clearTimeout(req.timeoutId);
    delete requests[msg.reqId];

    if (msg.type === 'ack') {
      req.resolve();
    }

    if (msg.type === 'notFound' || msg.type === 'timeout' || msg.type === 'invalid') {
      const error = new Error(`Websocket response for ${msg.reqId} is ${msg.type}`);
      Object.assign(error, msg);
      req.reject(error);
    }
  };

  handler.onChannel = async function onChannel(channel, fn) {
    if (handler.listenerCount(channel) > 0) {
      handler.on(channel, fn);
      if (cache[channel] != null) {
        fn(cache[channel]);
      }
      return Promise.resolve('repeat subscription');
    }

    handler.on(channel, message => {
      addToCache(channel, message);
      fn(message);
    });

    return handler.send({
      type: 'subscribe',
      channel
    });
  };

  handler.offChannel = async function offChannel(channel, fn) {
    handler.off(channel, fn);
    if (handler.listenerCount(channel) > 0) {
      return Promise.resolve('repeat subscription');
    }

    deleteFromCache(channel);
    return handler.send({
      type: 'unsubscribe',
      channel
    });
  };

  return handler;
}

function createSocket(
  url = 'ws://localhost:9001',
  onError = error => {
    console.error(error);
  }
) {
  wrapper = new Promise(socketResolve => {
    const socket = new WebSocket(url);
    const socketWrapper = createSocketWrapper(socket);

    socket.onerror = e => {
      onError(e);
    };

    socket.onmessage = e => {
      const msg = JSON.parse(e.data);

      if (msg.type === 'ack' || msg.type === 'notFound' || msg.type === 'invalid') {
        socketWrapper._handleResponse(msg);
        return;
      }

      if (msg.type === 'forward') {
        socketWrapper.emit(msg.channel, msg);
        return;
      }

      console.error(`message type unrecognised: ${JSON.stringify(msg)}`);
    };

    socket.onclose = () => {
      wrapper = null;
    };

    socket.onopen = () => {
      socketResolve(socketWrapper);
    };
  });
  return wrapper;
}

export { createSocket, getSocket, createOrGetSocket };
