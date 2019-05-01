import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import { useBoundChannel } from '../context';

const styles = () => ({});

function Button(props) {
  const { children, onClick } = useBoundChannel(props);

  return <button onClick={onClick}>{children}</button>;
}

export default withStyles(styles)(Button);
