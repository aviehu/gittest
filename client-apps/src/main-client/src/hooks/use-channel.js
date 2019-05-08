import get from 'lodash/get'
import { useEffect, useState } from 'react';
import { dispatch, subscribe, unsubscribe } from '../core/api';

export default function useChannel(channel, channelProperty, initialChannelMessage = {}) {
  const [channelData, setChannelData] = useState(initialChannelMessage);

  useEffect(() => {
    subscribe(channel, setChannelData);
    return () => unsubscribe(channel, setChannelData);
  }, [channel]);

  return {
    ...channelData,
    basicValue: get(channelData.data, channelProperty),
    sendAction(action) {
      console.log(`Sending action ${channel}.${action} to ${channelData.callback}`);
      return dispatch(channel, action, channelData.callback);
    }
  };
}
