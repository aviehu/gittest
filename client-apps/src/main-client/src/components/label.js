import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import { useBoundChannel } from '../context';

const styles = () => ({});

function Button(props) {
  const channelProps = useBoundChannel(props);

  return <button {...channelProps} />;
}

export default withStyles(styles)(Button);
