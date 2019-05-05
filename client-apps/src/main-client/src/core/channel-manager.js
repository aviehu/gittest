import { useRef, useState } from 'react';

import createSocket from './socket-wrapper';

const actionsMap = {
  click_action: {
    domEvent: 'onClick'
  }
};

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

  function updateChannel(name, channelData, channelEvents) {
    setValue(v => ({
      ...v,
      [name]: { ...channelData, ...channelEvents }
    }));
  }

  function removeChannel(name) {
    setValue(v => ({
      ...v,
      [name]: undefined
    }));
  }

  function onMessage(msg) {
    const events = msg.actions.reduce((acc, action) => {
      const event = actionsMap[action];

      acc[event.domEvent] = async () => {
        const socket = await socketRef.current;
        const actionMessage = {
          type: 'action',
          url: msg.callback,
          channel: msg.channel,
          source: 'PubUi',
          operatorId: 'PubUi-master',
          action
        };

        await socket.send(actionMessage);
      };

      return acc;
    }, {});

    updateChannel(msg.channel, msg.data, events);
  }

  socketRef.current = createSocket('ws://localhost:8080', onMessage);

  return [value, addChannel, removeChannel, updateChannel];
}
