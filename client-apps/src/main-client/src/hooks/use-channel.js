import { useEffect, useState } from 'react';
import { subscribe, unsubscribe, dispatch } from '../core/api';

export default function useBoundChannel(props) {
  const [channelData, setChannelData] = useState();
  const { channel, channelProp } = props;

  useEffect(() => {
    function update({ actions, callback, data }) {
      const value = channelProp ? data[channelProp] : props.value;

      const sendAction = action => {
        console.log(`Sending action ${channel}.${action} to ${callback}`);
        return dispatch(channel, action, callback);
      };

      setChannelData({ ...data, value, actions, sendAction });
    }

    subscribe(channel, update);

    return () => {
      unsubscribe(channel, update);
    };
  }, []);

  return { ...props, ...channelData };
}
