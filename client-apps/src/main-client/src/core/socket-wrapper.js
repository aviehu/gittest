import { useEffect } from 'react';
import uuid from 'uuid/v4';

export default async function createSocket(url, onMessage, onError = () => {}) {
  return new Promise(socketResolve => {
    useEffect(() => {
      const socket = new WebSocket(url);
      const requests = {};

      function handleResponse(msg) {
        const req = requests[msg.reqId];

        if (!req) {
          return;
        }

        if (msg.type === 'ack') {
          req.resolve();
        }

        if (msg.type === 'notFound' || msg.type === 'timeout') {
          req.reject();
        }

        delete requests[msg.reqId];
      }

      socket.onerror = e => {
        onError(e);
      };

      socket.onmessage = e => {
        const msg = JSON.parse(e.data);

        if (msg.type === 'ack' || msg.type === 'notFound') {
          handleResponse(msg);
          return;
        }

        onMessage(msg);
      };

      const handler = {
        send: message => {
          const id = uuid();

          return new Promise((resolve, reject) => {
            requests[id] = { resolve, reject };

            setTimeout(() => {
              handleResponse({ reqId: id, type: 'timeout' });
            }, 3000);

            socket.send(JSON.stringify({ ...message, id }));
          });
        }
      };

      socket.onopen = () => {
        socketResolve(handler);
      };
    });
  });
}
