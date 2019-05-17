import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { logout } from './core/api';
import useKeyboard from './hooks/use-keyboard';

const styles = () => ({
  theRoot: {
    backgroundColor: '#303030',
    height: '100vh',
    boxSizing: 'border-box',
    overflow: 'auto'
  }
});

function App({ element, classes }) {
  useKeyboard('KeyL', { isAlt: true }, logout);
  return <div className={classes.theRoot}>
    {element}
  </div>;
}

export default withStyles(styles)(App);
