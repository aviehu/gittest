import _createSocketWrapper from './_create-socket-wrapper';

let wrapper;

function createOrGetSocket(url, onError) {
  return getSocket() || createSocket(url, onError);
}

function getSocket() {
  return wrapper;
}

function createSocket(
  url = 'ws://localhost:9001',
  onError = error => {
    console.error(error);
  }
) {
  return new Promise(socketResolve => {
    const socket = new WebSocket(url);
    wrapper = _createSocketWrapper(socket);

    socket.onerror = e => {
      onError(e);
    };

    socket.onmessage = e => {
      const msg = JSON.parse(e.data);

      if (msg.type === 'ack' || msg.type === 'notFound' || msg.type === 'invalid') {
        wrapper._handleResponse(msg);
        return;
      }

      if (msg.type === 'forward') {
        wrapper.emit(msg.channel, msg);
        return;
      }

      console.error(`message type unrecognised: ${JSON.stringify(msg)}`);
    };

    socket.onclose = () => {
      wrapper = null;
    };

    socket.onopen = () => {
      socketResolve(wrapper);
    };
  });
}

export { createSocket, getSocket, createOrGetSocket };
