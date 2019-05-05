import { createOrGetSocket, getSocket } from './sockets';

async function subscribe(channel, fn) {
  const socket = await createOrGetSocket();
  if (channel == null) {
    return;
  }
  socket.onChannel(channel, fn);
}

async function unsubscribe(channel, fn) {
  const socket = getSocket();
  if (socket == null || channel == null) {
    return;
  }
  socket.offChannel(channel, fn);
}

async function action(channel, actionName, url, data = {}) {
  const socket = await createOrGetSocket();
  await socket.send({
    url,
    type: 'action',
    channel,
    action: actionName,
    data
  });
}

export { subscribe, unsubscribe, action };
