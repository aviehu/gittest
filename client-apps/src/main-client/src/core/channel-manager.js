import { useEffect, useRef, useState } from 'react';
import uuid from 'uuid/v4';

export default function useChannelManager() {
  const socketRef = useRef();
  const [value, setValue] = useState({});

  async function addChannel(name) {
    const socket = await socketRef.current;
    socket.send(
      JSON.stringify({
        id: uuid(),
        type: 'subscribe',
        channel: name
      })
    );

    setValue(v => ({
      ...v,
      [name]: {}
    }));
  }

  function updateChannel(name, channelData) {
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

  socketRef.current = new Promise(resolve => {
    useEffect(() => {
      const socket = new WebSocket('ws://localhost:8080');

      socket.onerror = event => {
        console.log('err', event);
      };

      socket.onmessage = event => {
        console.log('msg', event);
      };

      socket.onopen = () => {
        resolve(socket);
      };

      return () => {
        socket.close();
      };
    }, []);
  });

  return [value, addChannel, removeChannel, updateChannel];
}
