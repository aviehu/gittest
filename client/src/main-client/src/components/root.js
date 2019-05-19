import React from 'react';
import { AppBar as MaterialAppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { logout } from '../core/api';

const styles = () => ({});

function Root({ children, title }) {
  return (
    <div>
      <MaterialAppBar
        position="static"
        style={{
          backgroundImage: 'url(/images/appbar.jpg)',
          backgroundSize: 'cover',
          backgroundPostion: 'center'
        }}
      >
        <Toolbar>
          <img
            // className={classes.icon}
            style={{ marginLeft: -12, marginRight: 20 }}
            src="/images/logo.png"
            alt="app logo logo"
            height="40px"
          />
          <Typography variant="h6" style={{ flexGrow: 1, color: '#ededee' }}>
            {title}
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Button style={{ color: '#ededee' }} onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </MaterialAppBar>
      {children}
    </div>
  );
}

export default withStyles(styles)(Root);
