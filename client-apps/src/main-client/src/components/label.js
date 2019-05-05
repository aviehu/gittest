import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import MaterialButton from '@material-ui/core/Button';

import useChannel from '../hooks/use-channel';
import { action } from '../core/api';

const styles = () => ({});

function Button(props) {
  const { children, render, channel } = props;
  const { data, actions, callback } = useChannel(props);
  console.log({ data, actions, callback });

  const sendAction = () => {
    console.log(`Sending action ${channel}.${actions[0]} to ${callback}`);
    action(channel, actions[0], callback);
  };

  return <MaterialButton onClick={sendAction}>{render ? render({ data }) : children}</MaterialButton>;
}

export default withStyles(styles)(Button);
