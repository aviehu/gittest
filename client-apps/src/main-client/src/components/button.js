import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import MaterialButton from '@material-ui/core/Button';

import useChannel from '../hooks/use-channel';

const styles = () => ({});

function Button(props) {
  const { children, render } = props;
  const { data, actions, sendAction } = useChannel(props);

  return (
    <MaterialButton onClick={() => sendAction(actions[0])} {...props}>
      {render ? render({ data, actions }) : children}
    </MaterialButton>
  );
}

export default withStyles(styles)(Button);
