import { useEffect, useState } from 'react';
import { dispatch, subscribe, unsubscribe} from '../core/api';

export default function useChannel({ channel }) {
  const [channelData, setChannelData] = useState({
    data: { text: 'hello world' },
    actions: ['punchIt'],
    url: 'http://localhost:8080'
  });

  function handleSubscription(data) {
    console.log(`useChannel update received`);

    function sendAction(action) {
      console.log(`Sending action ${channel}.${action} to ${data.callback}`);
      return dispatch(channel, action, data.callback);
    }

    setChannelData({ ...data, sendAction });
  }

  useEffect(() => {
    subscribe(channel, handleSubscription);
    return () => unsubscribe(channel, handleSubscription);
  }, [channel]);

  return channelData;
}
