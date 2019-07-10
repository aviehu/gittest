import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import MaterialButton from '@material-ui/core/Button';

import useChannel from '../hooks/use-channel';

const styles = () => ({});

function Button(props) {
  const { children, render, ...materialProps } = props;
  const { data, actions, channelValue, sendAction } = useChannel(props);

  return (
    <MaterialButton onClick={() => sendAction(actions[0])} {...materialProps}>
      {(render && render({ data, actions })) || channelValue || children}
    </MaterialButton>
  );
}

export default withStyles(styles)(Button);
