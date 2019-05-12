import uuid from 'uuid/v4';
import EventEmitter from 'eventemitter3';
import { addToCache, deleteFromCache, getFromCache, hasInCache } from './_cache';

export default function _createSocketWrapper(socket) {
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
      req.reject(msg.errors);
    }
  };

  handler.onChannel = async function onChannel(channel, fn) {
    if (handler.listenerCount(channel) > 0) {
      handler.on(channel, fn);
      if (hasInCache(channel)) {
        fn(getFromCache(channel));
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
