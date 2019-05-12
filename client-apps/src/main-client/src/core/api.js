import { createOrGetSocket, getSocket } from './socket-wrapper';

async function subscribe(channel, fn) {
  const socket = await createOrGetSocket();
  if (channel == null) {
    return;
  }
  try {
    await socket.onChannel(channel, fn);
  } catch (error) {
    console.error(error, `Error calling subscribe(${channel}): ${JSON.stringify(error.errors)}`);
  }
}

async function unsubscribe(channel, fn) {
  const socket = await getSocket();
  if (socket == null || channel == null) {
    return;
  }
  try {
    socket.offChannel(channel, fn);
  } catch (error) {
    console.error(error, `Error calling unsubscribe(${channel}): ${JSON.stringify(error.errors)}`);
  }
}

async function dispatch(channel, actionName, url, data = {}) {
  const socket = await createOrGetSocket();
  try {
    await socket.send({
      url,
      type: 'action',
      channel,
      action: actionName,
      data
    });
  } catch (error) {
    console.error(
      error,
      `Error calling dispatch(${channel}, ${actionName}, ${url}, ${data}): ${JSON.stringify(error.errors)}`
    );
  }
}

export { subscribe, unsubscribe, dispatch };