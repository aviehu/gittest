import get from 'lodash/get';
import { useEffect, useState } from 'react';
import { subscribe, unsubscribe, dispatch, clearData } from '../core/api';

export default function useChannel({
  channel,
  channelProp = 'value',
  initialData = {},
  initialActions = []
}) {
  const [channelPayload, setChannelPayload] = useState({ data: initialData, actions: initialActions });

  useEffect(() => {
    subscribe(channel, setChannelPayload);
    return () => unsubscribe(channel, setChannelPayload);
  }, [channel]);

  return {
    ...channelPayload,
    channelValue: get(channelPayload.data, channelProp),
    sendAction(action) {
      // eslint-disable-next-line no-console
      console.log(`Sending action ${channel}.${action} to ${channelPayload.callback}`);
      return dispatch(channel, action, channelPayload.callback);
    },
    clearData() {
      return clearData(channel, initialData);
    }
  };
}
