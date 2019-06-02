import React from 'react';
import Typography from '@material-ui/core/Typography';
import useChannel from '../hooks/use-channel';

export default function Label(props) {
  const { children, render, prefix, ...materialProps } = props;
  const { data, value, actions } = useChannel(props);
  const child = prefix ? prefix + (value || '') : (render && render({ data, actions })) || value || children;
  return <Typography {...materialProps}>{child}</Typography>;
}
