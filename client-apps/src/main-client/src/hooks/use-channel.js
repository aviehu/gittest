import get from 'lodash/get';
import { useEffect, useState } from 'react';
import { subscribe, unsubscribe, dispatch } from '../core/api';

export default function useChannel({ channel, channelProp, initialChannelMessage = { data: {}, actions: [] }, value }) {
  const [channelPayload, setChannelPayload] = useState(initialChannelMessage);

  useEffect(() => {
    subscribe(channel, setChannelPayload);
    return () => unsubscribe(channel, setChannelPayload);
  }, [channel]);

  return {
    ...channelPayload,
    value: get(channelPayload.data, channelProp, value),
    sendAction(action) {
      // eslint-disable-next-line no-console
      console.log(`Sending action ${channel}.${action} to ${channelPayload.callback}`);
      return dispatch(channel, action, channelPayload.callback);
    }
  };
}