const _ = require('lodash/fp');
const EventEmitter = require('events');
const uuidv1 = require('uuid').v1;
const fetch = require('node-fetch');
const waitForExpect = require('wait-for-expect');
const wrapWebsocketServer = require('../src/websocket-server/wrap-websocket-server');
const buildClientGatewayServer = require('../src/clientGatewayServer');
const { getAllSubscribers, clearAllSubscribers } = require('../src/subscribers');
const cache = require('../src/cache');

jest.mock('node-fetch');

function buildWs() {
  const socket = new EventEmitter();
  socket.terminate = () => {
    socket.emit('close');
  };
  socket.ping = () => {
    // eslint-disable-next-line no-console
    console.info('ping');
  };

  socket.send = jest.fn();
  return socket;
}

function buildWss() {
  const server = new EventEmitter();
  server.options = { port: 'test' };
  server.clients = [];
  server.on('connection', socket => {
    server.clients.push(socket);
  });
  server.on('close', () => {
    server.clients = [];
  });
  server.connect = () => {
    const socket = buildWs();
    server.emit('connection', socket);
    return socket;
  };
  return wrapWebsocketServer(server, { log: console });
}

function sentJson(socket, idx) {
  if (socket.send.mock.calls[idx] == null) {
    return undefined;
  }

  return JSON.parse(socket.send.mock.calls[idx][0]);
}

function sentJson(socket, idx) {
  if (socket.send.mock.calls[idx] == null) {
    return undefined;
  }

  return JSON.parse(socket.send.mock.calls[idx][0]);
}

describe('client gateway server', () => {
  let server;

  beforeAll(() => {
    server = buildWss();
    buildClientGatewayServer(server, console);
  });

  beforeEach(() => {
    server.clients = [];
    clearAllSubscribers();
    cache.clear();
    fetch.mockClear();
  });

  it('should reject a message without a type', () => {
    const socket = server.connect();
    const message = {
      id: uuidv1(),
      channels: 'ch1'
    };

    socket.emit('message', JSON.stringify(message));

    expect(socket.send).toHaveBeenCalledTimes(1);
    expect(sentJson(socket, 0)).toEqual({
      id: expect.any(String),
      reqId: message.id,
      type: 'invalid',
      errors: [expect.objectContaining({ message: `should have required property 'type'` })]
    });
  });

  it('should validate subscribe', () => {
    const socket = server.connect();
    const message = {
      id: uuidv1(),
      type: 'subscribe',
      channels: 'ch1'
    };

    socket.emit('message', JSON.stringify(message));

    expect(socket.send).toHaveBeenCalledTimes(1);
    expect(sentJson(socket, 0)).toEqual({
      id: expect.any(String),
      reqId: message.id,
      type: 'invalid',
      errors: [expect.objectContaining({ message: `should have required property 'channel'` })]
    });
    expect(getAllSubscribers()).toEqual({});
  });

  it('should handle subscribe', () => {
    const socket = server.connect();
    const message = {
      id: uuidv1(),
      type: 'subscribe',
      channel: 'ch1'
    };

    socket.emit('message', JSON.stringify(message));

    expect(socket.send).toHaveBeenCalledTimes(1);
    expect(sentJson(socket, 0)).toEqual({
      id: expect.any(String),
      reqId: message.id,
      type: 'ack'
    });
    expect(getAllSubscribers()).toEqual({ ch1: { [socket.id]: socket } });
  });

  it('should handle subscribe & send from cache for the channel', () => {
    const socket = server.connect();
    const ch1Message = { id: uuidv1(), channel: 'ch1', event: 'ev1', data: { a: 1, b: 2 } };
    cache.set('ch1', ch1Message);
    const message = {
      id: uuidv1(),
      type: 'subscribe',
      channel: 'ch1'
    };

    socket.emit('message', JSON.stringify(message));

    expect(socket.send).toHaveBeenCalledTimes(2);
    expect(sentJson(socket, 0)).toEqual({ id: expect.any(String), reqId: message.id, type: 'ack' });
    expect(sentJson(socket, 1)).toEqual(ch1Message);
    expect(getAllSubscribers()).toEqual({ ch1: { [socket.id]: socket } });
  });

  it('should handle subscribeMany', () => {
    const socket = server.connect();
    const message = {
      id: uuidv1(),
      type: 'subscribeMany',
      channels: ['ch1', 'ch2', 'ch3']
    };

    socket.emit('message', JSON.stringify(message));

    expect(socket.send).toHaveBeenCalledTimes(1);
    expect(sentJson(socket, 0)).toEqual({
      id: expect.any(String),
      reqId: message.id,
      type: 'ack'
    });
    expect(getAllSubscribers()).toEqual({
      ch1: { [socket.id]: socket },
      ch2: { [socket.id]: socket },
      ch3: { [socket.id]: socket }
    });
  });

  it('should handle subscibeMany & send from cache for some of the channels', () => {
    const socket = server.connect();
    const ch1Message = { id: uuidv1(), channel: 'ch1', event: 'ev1', data: { a: 1, b: 2 } };
    const ch2Message = _.assign({}, ch1Message, { channel: 'ch2' });
    cache.set('ch1', ch1Message);
    cache.set('ch3', ch2Message);
    const message = {
      id: uuidv1(),
      type: 'subscribeMany',
      channels: ['ch1', 'ch2', 'ch3']
    };

    socket.emit('message', JSON.stringify(message));

    expect(socket.send).toHaveBeenCalledTimes(3);
    expect(sentJson(socket, 0)).toEqual({ id: expect.any(String), reqId: message.id, type: 'ack' });
    expect(sentJson(socket, 1)).toEqual(ch1Message);
    expect(sentJson(socket, 2)).toEqual(ch2Message);
    expect(getAllSubscribers()).toEqual({
      ch1: { [socket.id]: socket },
      ch2: { [socket.id]: socket },
      ch3: { [socket.id]: socket }
    });
  });

  it('should handle be able to unsubscribe', () => {
    const socket = server.connect();

    socket.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch1'
      })
    );

    socket.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'unsubscribe',
        channel: 'ch1'
      })
    );

    expect(socket.send).toHaveBeenCalledTimes(2);
    expect(getAllSubscribers()).toEqual({ ch1: {} });
  });

  it('should handle be able to unsubscribeMany', () => {
    const socket1 = server.connect();
    const socket2 = server.connect();
    const socket3 = server.connect();

    socket1.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch1'
      })
    );
    socket1.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch2'
      })
    );
    socket1.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch3'
      })
    );
    socket2.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch3'
      })
    );
    socket3.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch1'
      })
    );
    socket3.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch3'
      })
    );

    expect(socket1.send).toHaveBeenCalledTimes(3);
    expect(socket2.send).toHaveBeenCalledTimes(1);
    expect(socket3.send).toHaveBeenCalledTimes(2);
    expect(getAllSubscribers()).toEqual({
      ch1: { [socket1.id]: socket1, [socket3.id]: socket3 },
      ch2: { [socket1.id]: socket1 },
      ch3: { [socket1.id]: socket1, [socket2.id]: socket2, [socket3.id]: socket3 }
    });

    socket1.emit('message', JSON.stringify({ id: uuidv1(), type: 'unsubscribeMany', channels: ['ch1', 'ch2'] }));
    expect(socket1.send).toHaveBeenCalledTimes(4);
    expect(getAllSubscribers()).toEqual({
      ch1: { [socket3.id]: socket3 },
      ch2: {},
      ch3: { [socket1.id]: socket1, [socket2.id]: socket2, [socket3.id]: socket3 }
    });
  });

  it('should handle be able to unsubscribeAll', () => {
    const socket1 = server.connect();
    const socket2 = server.connect();
    const socket3 = server.connect();

    socket1.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch1'
      })
    );
    socket1.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch2'
      })
    );
    socket1.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch3'
      })
    );
    socket2.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch3'
      })
    );
    socket3.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch1'
      })
    );
    socket3.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch3'
      })
    );

    expect(socket1.send).toHaveBeenCalledTimes(3);
    expect(socket2.send).toHaveBeenCalledTimes(1);
    expect(socket3.send).toHaveBeenCalledTimes(2);
    expect(getAllSubscribers()).toEqual({
      ch1: { [socket1.id]: socket1, [socket3.id]: socket3 },
      ch2: { [socket1.id]: socket1 },
      ch3: { [socket1.id]: socket1, [socket2.id]: socket2, [socket3.id]: socket3 }
    });

    socket1.emit('message', JSON.stringify({ id: uuidv1(), type: 'unsubscribeAll' }));
    expect(socket1.send).toHaveBeenCalledTimes(4);
    expect(getAllSubscribers()).toEqual({
      ch1: { [socket3.id]: socket3 },
      ch2: {},
      ch3: { [socket2.id]: socket2, [socket3.id]: socket3 }
    });
  });

  it('should handle be able to close that will unsubscribeAll', () => {
    const socket1 = server.connect();
    const socket2 = server.connect();
    const socket3 = server.connect();

    socket1.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch1'
      })
    );
    socket1.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch2'
      })
    );
    socket1.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch3'
      })
    );
    socket2.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch3'
      })
    );
    socket3.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch1'
      })
    );
    socket3.emit(
      'message',
      JSON.stringify({
        id: uuidv1(),
        type: 'subscribe',
        channel: 'ch3'
      })
    );

    expect(socket1.send).toHaveBeenCalledTimes(3);
    expect(socket2.send).toHaveBeenCalledTimes(1);
    expect(socket3.send).toHaveBeenCalledTimes(2);
    expect(getAllSubscribers()).toEqual({
      ch1: { [socket1.id]: socket1, [socket3.id]: socket3 },
      ch2: { [socket1.id]: socket1 },
      ch3: { [socket1.id]: socket1, [socket2.id]: socket2, [socket3.id]: socket3 }
    });

    socket1.terminate();
    expect(socket1.send).toHaveBeenCalledTimes(3);
    expect(getAllSubscribers()).toEqual({
      ch1: { [socket3.id]: socket3 },
      ch2: {},
      ch3: { [socket2.id]: socket2, [socket3.id]: socket3 }
    });
  });

  it('should be able to send actions for channels a client is subscribed to', async () => {
    fetch.mockResolvedValue({ ok: true });
    const socket = server.connect();
    const subscribeMessage = {
      id: uuidv1(),
      type: 'subscribe',
      channel: 'car'
    };
    const actionMessage = {
      id: uuidv1(),
      type: 'action',
      url: 'http://198.1.0.1/actions',
      operatorId: '1234123',
      source: 'PubUi',
      channel: 'car',
      action: 'stop',
      data: {
        timeout: '10'
      }
    };

    socket.emit('message', JSON.stringify(subscribeMessage));
    socket.emit('message', JSON.stringify(actionMessage));

    expect(sentJson(socket, 0)).toEqual({
      id: expect.any(String),
      reqId: subscribeMessage.id,
      type: 'ack'
    });
    expect(sentJson(socket, 1)).toEqual({ id: expect.any(String), reqId: actionMessage.id, type: 'ack' });

    await waitForExpect(() =>
      expect(sentJson(socket, 2)).toEqual({
        id: expect.any(String),
        reqId: actionMessage.id,
        type: 'success'
      })
    );
    expect(socket.send).toHaveBeenCalledTimes(3);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(actionMessage.url, {
      method: 'post',
      body: JSON.stringify(_.omit(['type'], actionMessage)),
      headers: { 'Content-Type': 'application/json' }
    });
  });

  it('should not be able to send actions for channels a client is not subscribed to', async () => {
    const socket = server.connect();

    const actionMessage = {
      id: uuidv1(),
      type: 'action',
      url: 'http://198.1.0.1/actions',
      operatorId: '1234123',
      source: 'PubUi',
      channel: 'car',
      action: 'stop',
      data: {
        timeout: '10'
      }
    };

    socket.emit('message', JSON.stringify(actionMessage));

    expect(sentJson(socket, 0)).toEqual({
      id: expect.any(String),
      reqId: actionMessage.id,
      type: 'invalid',
      errors: [{ message: 'should have subscribed to channel' }]
    });

    expect(fetch).not.toHaveBeenCalled();
  });

  it('should be able to validate actions', async () => {
    fetch.mockResolvedValue({ ok: true });
    const socket = server.connect();
    const subscribeMessage = {
      id: uuidv1(),
      type: 'subscribe',
      channel: 'car'
    };
    const actionMessage = {
      id: uuidv1(),
      type: 'action',
      url: 'http://198.1.0.1/actions',
      source: 'PubUi',
      channel: 'car',
      action: 'stop',
      data: {
        timeout: 10
      }
    };

    socket.emit('message', JSON.stringify(subscribeMessage));
    socket.emit('message', JSON.stringify(actionMessage));

    expect(sentJson(socket, 0)).toEqual({ id: expect.any(String), reqId: subscribeMessage.id, type: 'ack' });
    expect(sentJson(socket, 1)).toEqual({
      id: expect.any(String),
      reqId: actionMessage.id,
      type: 'invalid',
      errors: [
        {
          dataPath: '',
          keyword: 'required',
          message: "should have required property 'operatorId'",
          params: { missingProperty: 'operatorId' },
          schemaPath: '#/required'
        }
      ]
    });
  });

  it('should be able to send back action failures', async () => {
    fetch.mockResolvedValue({ ok: false, errors: '404 Not Found' });
    const socket = server.connect();
    const subscribeMessage = {
      id: uuidv1(),
      type: 'subscribe',
      channel: 'car'
    };
    const actionMessage = {
      id: uuidv1(),
      type: 'action',
      url: 'http://198.1.0.1/actions',
      operatorId: '1234123',
      source: 'PubUi',
      channel: 'car',
      action: 'stop',
      data: {
        timeout: '10'
      }
    };

    socket.emit('message', JSON.stringify(subscribeMessage));
    socket.emit('message', JSON.stringify(actionMessage));

    expect(sentJson(socket, 0)).toEqual({ id: expect.any(String), reqId: subscribeMessage.id, type: 'ack' });
    expect(sentJson(socket, 1)).toEqual({ id: expect.any(String), reqId: actionMessage.id, type: 'ack' });

    await waitForExpect(() =>
      expect(sentJson(socket, 2)).toEqual({
        id: expect.any(String),
        reqId: actionMessage.id,
        type: 'error',
        errors: '404 Not Found'
      })
    );
    expect(socket.send).toHaveBeenCalledTimes(3);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(actionMessage.url, {
      method: 'post',
      body: JSON.stringify(_.omit(['type'], actionMessage)),
      headers: { 'Content-Type': 'application/json' }
    });
  });

  it('should be able to send back fetch errors', async () => {
    fetch.mockRejectedValue(new Error('blah'));
    const socket = server.connect();
    const subscribeMessage = {
      id: uuidv1(),
      type: 'subscribe',
      channel: 'car'
    };
    const actionMessage = {
      id: uuidv1(),
      type: 'action',
      url: 'http://198.1.0.1/actions',
      operatorId: '1234123',
      source: 'PubUi',
      channel: 'car',
      action: 'stop',
      data: {
        timeout: '10'
      }
    };

    socket.emit('message', JSON.stringify(subscribeMessage));
    socket.emit('message', JSON.stringify(actionMessage));

    expect(sentJson(socket, 0)).toEqual({ id: expect.any(String), reqId: subscribeMessage.id, type: 'ack' });
    expect(sentJson(socket, 1)).toEqual({ id: expect.any(String), reqId: actionMessage.id, type: 'ack' });

    await waitForExpect(
      () =>
        expect(sentJson(socket, 2)).toEqual({
          id: expect.any(String),
          reqId: actionMessage.id,
          type: 'error',
          errors: 'UNKNOWN_LIVEU_SERVER_ERROR'
        }),
      5000
    );
    expect(socket.send).toHaveBeenCalledTimes(3);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(actionMessage.url, {
      method: 'post',
      body: JSON.stringify(_.omit(['type'], actionMessage)),
      headers: { 'Content-Type': 'application/json' }
    });
  });
});
