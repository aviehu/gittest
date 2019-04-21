const _ = require('lodash/fp');
const uuidv1 = require('uuid/v1');
const Ajv = require('ajv');
const fetch = require('node-fetch');

const { addSubscriber, isSubscribed, removeSubscriber, removeAllSubscriptions } = require('./subscribers');
const cache = require('./cache');

const actionSchema = require('./schemas/action.json');

const ajv = new Ajv({
  schemas: [actionSchema],
  removeAdditional: true,
  useDefaults: true, // replace missing properties and items with the values from corresponding default keyword
  coerceTypes: true, // change data type of data to match type keyword
  allErrors: true
});

function ack(ws, message) {
  ws.send({ id: uuidv1(), reqId: message.id, type: 'ack' });
}

function invalid(ws, message, errors) {
  ws.send({ id: uuidv1(), reqId: message.id, type: 'invalid', errors });
}

function success(ws, message) {
  ws.send({ id: uuidv1(), reqId: message.id, type: 'success' });
}

function failed(ws, message, response) {
  ws.send({ id: uuidv1(), reqId: message.id, type: 'error', errors: response.errors || 'UNKNOWN_LIVEU_SERVER_ERROR' });
}

function handleSocket(ws) {
  function subscribe(message) {
    addSubscriber(ws, message);

    ack(ws, message);
    if (cache.has(message.channel)) {
      ws.send(cache.get(message.channel));
    }
  }

  function unsubscribe(message) {
    ack(ws, message);
    removeSubscriber(ws, message);
  }

  async function action(message) {
    if (!isSubscribed(ws, message)) {
      invalid(ws, message, [{ message: 'should have subscribed to channel' }]);
      return;
    }

    if (!ajv.validate('action', message)) {
      invalid(ws, message, ajv.errors);
      return;
    }

    ack(ws, message);
    try {
      const response = await fetch(message.url, {
        method: 'post',
        body: JSON.stringify(_.omit(['type'], message)),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        success(ws, message);
      } else {
        failed(ws, message, response);
      }
    } catch (error) {
      failed(ws, message, error);
    }
  }

  function unsubscribeAll(message) {
    if (message != null) {
      ack(ws, message);
    }

    removeAllSubscriptions(ws);
  }

  // eslint-disable-next-line no-param-reassign
  ws.id = uuidv1();
  // eslint-disable-next-line no-param-reassign
  ws.lastPing = Date.now();

  ws.on('close', () => unsubscribeAll());

  ws.on('pong', () => {
    // eslint-disable-next-line no-param-reassign
    ws.lastPing = Date.now();
  });

  ws.on('message', message => {
    switch (message.type) {
      case 'subscribe':
        return subscribe(message);
      case 'unsubscribe':
        return unsubscribe(message);
      case 'unsubscribeAll':
        return unsubscribeAll(message);
      case 'action':
        return action(message);
      default:
        throw new Error(`Unknown message type ${message.type} for message ${JSON.stringify(message)}`);
    }
  });
}

function buildServer(wss) {
  wss.on('connection', handleSocket);

  const interval = setInterval(function ping() {
    wss.clients.forEach(ws => {
      if (Date.now() - ws.lastPing > 95000) {
        ws.terminate();
        return;
      }

      ws.ping(_.noop);
    });
  }, 30000);

  wss.on('close', () => {
    clearInterval(interval);
  });
}

module.exports = buildServer;
