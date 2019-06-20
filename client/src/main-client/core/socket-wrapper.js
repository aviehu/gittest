import createSocketWrapper from './_create-socket-wrapper';

let wrapper;

function createOrGetSocket(url, onError) {
  return getSocket() || createSocket(url, onError);
}

function getSocket() {
  return wrapper;
}

function createSocket(
  url = window.WEBSOCKET_SERVER_URL,
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
