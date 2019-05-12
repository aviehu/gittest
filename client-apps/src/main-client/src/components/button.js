import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import MaterialButton from '@material-ui/core/Button';

import useChannel from '../hooks/use-channel';

const styles = () => ({});

function Button(props) {
  const {
    children,
    render,
    channel,
    channelProp,
    initialChannelMessage,
    value: defaultValue,
    ...materialProps
  } = props;
  const { data, actions, value, sendAction } = useChannel(props);

  return (
    <MaterialButton onClick={() => sendAction(actions[0])} {...materialProps}>
      {(render && render({ data, actions })) || value || children}
    </MaterialButton>
  );
}

export default withStyles(styles)(Button);
