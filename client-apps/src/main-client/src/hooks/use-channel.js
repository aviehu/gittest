import { useEffect, useState } from 'react';
import { subscribe, unsubscribe } from '../core/api';

export default function useChannel({ channel }) {
  const [channelData, setChannelData] = useState({
    data: { text: 'hello world' },
    actions: ['punchIt'],
    url: 'http://localhost:8080'
  });

  useEffect(() => {
    subscribe(channel, setChannelData);
    return () => unsubscribe(channel, setChannelData);
  }, [channel]);

  return channelData;
}
