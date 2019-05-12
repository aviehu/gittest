/* eslint-disable unicorn/filename-case */
import React from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import useChannel from '../hooks/use-channel';

const styles = {
  badge: {
    position: 'relative',
    transform: 'none',
    top: '-2px'
  },
  colorPrimary: {
    backgroundColor: '#4caf50'
  },
  colorSecondary: {
    backgroundColor: '#f44336'
  }
};

function Led(props) {
  const { channel, channelProp, initialChannelMessage, condition, value: defaultValue, ...materialProps } = props;
  const { data, actions, value } = useChannel(props);

  const selection = (condition && condition({ data, actions })) || value ? 'primary' : 'secondary';
  return <Badge color={selection} {...materialProps} />;
}

export default withStyles(styles)(Led);
