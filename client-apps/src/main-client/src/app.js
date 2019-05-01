import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import Context from './context';

const styles = () => ({});

function App({ element }) {
  return <Context.Provider>{element}</Context.Provider>;
}

export default withStyles(styles)(App);
