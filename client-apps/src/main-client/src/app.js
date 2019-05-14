import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import { logout } from './core/api';
import useKeyboard from './hooks/use-keyboard';

const styles = () => ({});

function App({ element }) {
  useKeyboard('KeyL', { isAlt: true }, logout);

  return <div>{element}</div>;
}

export default withStyles(styles)(App);
