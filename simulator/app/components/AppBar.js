import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MaterialAppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({});

function AppBar() {
  return (
    <MaterialAppBar>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          PubU(i) Publisher simulator
        </Typography>
      </Toolbar>
    </MaterialAppBar>
  );
}
export default withStyles(styles)(AppBar);
