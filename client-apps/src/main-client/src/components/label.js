import React from 'react';
import Typography from '@material-ui/core/Typography';
import useChannel from '../hooks/use-channel';

export default function Label(props) {
  const {
    children,
    render,
    channel,
    channelProp,
    initialChannelMessage,
    value: defaultValue,
    ...materialProps
  } = props;
  const { data, value, actions } = useChannel(props);

  return <Typography {...materialProps}>{(render && render({ data, actions })) || value || children}</Typography>;
}
