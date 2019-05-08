import React from 'react';
import Typography from '@material-ui/core/Typography';
import useChannel from '../hooks/use-channel';

export default function Label(props) {
  const { children, render, channel, channelProperty, initialChannelMessage, ...materialProps } = props;
  const { data, basicValue, actions } = useChannel(channel, channelProperty, initialChannelMessage);

  return <Typography {...materialProps}>{(render && render({ data, actions })) || basicValue || children}</Typography>;
}
