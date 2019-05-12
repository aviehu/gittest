import get from 'lodash/get';
import { useEffect, useState } from 'react';
import { subscribe, unsubscribe, dispatch } from '../core/api';

export default function useBoundChannel(props) {
  const [channelData, setChannelData] = useState();
  const { channel, channelProp, value } = props;

  useEffect(() => {
    subscribe(channel, setChannelData);
    return () => unsubscribe(channel, setChannelData);
  }, [channel]);

  return {
    ...channelData,
    value: get(channelData.data, channelProp, value),
    sendAction(action) {
      // eslint-disable-next-line no-console
      console.log(`Sending action ${channel}.${action} to ${channelData.callback}`);
      return dispatch(channel, action, channelData.callback);
    }
  };
}
