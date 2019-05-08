import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import MaterialButton from '@material-ui/core/Button';

import useChannel from '../hooks/use-channel';

const styles = () => ({});

function Button(props) {
  const { children, render, channel, channelProperty, initialChannelMessage, ...materialProps } = props;
  const { data, actions, basicValue, sendAction } = useChannel(channel, channelProperty, initialChannelMessage);

  return (
    <MaterialButton onClick={() => sendAction(actions[0])} {...materialProps}>
      {(render && render({ data, actions })) || basicValue || children}
    </MaterialButton>
  );
}

export default withStyles(styles)(Button);
