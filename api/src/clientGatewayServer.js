const _ = require('lodash/fp');
const fetch = require('node-fetch');
const success = require('./websocket-server/messages/success');
const failed = require('./websocket-server/messages/failed');
const invalid = require('./websocket-server/messages/invalid');
const ack = require('./websocket-server/messages/ack');

const { addSubscriber, isSubscribed, removeSubscriber, removeAllSubscriptions } = require('./subscribers');
const cache = require('./cache');

const actionSchema = require('./schemas/action.json');
const singleChannelSchema = require('./schemas/single-channel.json');
const multiChannelSchema = require('./schemas/multi-channel.json');
function buildServer(wss, log) {
  wss.on('connection', ws => {
    ws.on('close', () => removeAllSubscriptions(ws));
  });

  wss.recv('subscribe', { schema: singleChannelSchema, sendAck: true }, (message, ws) => {
    addSubscriber(ws, message.channel);
    return cache.get(message.channel);
  });

  wss.recv('subscribeMany', { schema: multiChannelSchema, sendAck: true }, (message, ws) => {
    return _.compact(
      _.map(channel => {
        addSubscriber(ws, channel);
        return cache.get(channel);
      }, message.channels)
    );
  });

  wss.recv('unsubscribe', { schema: singleChannelSchema, sendAck: true }, (message, ws) => {
    return removeSubscriber(ws, message.channel);
  });

  wss.recv('unsubscribeMany', { schema: multiChannelSchema, sendAck: true }, (message, ws) => {
    return _.compact(_.map(channel => removeSubscriber(ws, channel), message.channels));
  });

  wss.recv('unsubscribeAll', { sendAck: true }, (message, ws) => {
    return removeAllSubscriptions(ws);
  });

  wss.recv('action', { schema: actionSchema, sendAck: false }, async (message, ws) => {
    if (!isSubscribed(ws, message.channel)) {
      invalid(ws, message, [{ message: 'should have subscribed to channel' }]);
      return;
    }

    ack(ws, message);

    const body = _.omit(['type'], message);
    log.info(`ACTION: ${JSON.stringify(body)} to ${message.url}`);
    const response = await fetch(message.url, {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      success(ws, message);
    } else {
      failed(ws, message, response);
    }
  });

  log.info(`Websocket server listening on ${wss.options.port}`);
}

module.exports = buildServer;
