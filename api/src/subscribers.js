const _ = require('lodash/fp');

const subscribers = {};

function addSubscriber(ws, channel) {
  if (subscribers[channel] == null) {
    subscribers[channel] = {};
  }

  subscribers[channel][ws.id] = ws;
}

function removeSubscriber(ws, channel) {
  if (subscribers[channel] == null) {
    return;
  }

  delete subscribers[channel][ws.id];
}

function isSubscribed(ws, channel) {
  return subscribers[channel] && subscribers[channel][ws.id] && true;
}

function removeAllSubscriptions(ws) {
  _.forEach(websockets => {
    // eslint-disable-next-line no-param-reassign
    delete websockets[ws.id];
  })(subscribers);
}

function getSubscribers(channel) {
  return subscribers[channel];
}

function getAllSubscribers() {
  return subscribers;
}

function clearAllSubscribers() {
  _.forEach(k => {
    delete subscribers[k];
  })(Object.keys(subscribers));
}

module.exports = {
  addSubscriber,
  getSubscribers,
  isSubscribed,
  removeSubscriber,
  removeAllSubscriptions,
  getAllSubscribers,
  clearAllSubscribers
};
