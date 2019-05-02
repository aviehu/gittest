import { useRef, useState } from 'react';

import createSocket from './socket-wrapper';

export default function useChannelManager() {
  const socketRef = useRef();
  const [value, setValue] = useState({});

  async function addChannel(name) {
    const socket = await socketRef.current;
    await socket.send({
      type: 'subscribe',
      channel: name
    });

    setValue(v => ({
      ...v,
      [name]: {}
    }));
  }

  function updateChannel(name, channelData, channelActions) {
    setValue(v => ({
      ...v,
      [name]: channelData
    }));
  }

  function removeChannel(name) {
    setValue(v => ({
      ...v,
      [name]: undefined
    }));
  }

  function onMessage(msg) {
    updateChannel(msg.channel, msg.data, msg.actions);
  }

  socketRef.current = createSocket('ws://localhost:8080', onMessage);

  return [value, addChannel, removeChannel, updateChannel];
}
