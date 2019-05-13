import _ from 'lodash';
import React from 'react';
import { Drawer, withStyles } from '@material-ui/core';
import { blue, red, grey, yellow } from '@material-ui/core/colors';
import Label from './label';
import useChannel from '../hooks/use-channel';

const drawerHeight = 240;
const shades = { dark: 200, light: 500 };

function getShade(theme) {
  if (shades[theme.palette.type]) {
    return shades[theme.palette.type];
  }

  return shades.light;
}

const styles = theme => ({
  root: { overflow: 'auto', height: drawerHeight, flexShrink: 0 },
  paper: {
    height: drawerHeight,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    '&::-webkit-scrollbar': {
      width: 10
    },

    /* Track */
    '&::-webkit-scrollbar-track': {
      background: '#424242',
      borderLeft: '1px solid #888'
    },

    /* Handle */
    '&::-webkit-scrollbar-thumb': {
      background: '#888'
    },

    /* Handle on hover */
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555'
    }
  },
  debug: {
    color: grey[getShade(theme) + 200]
  },
  info: {
    color: blue[getShade(theme)]
  },
  warn: {
    color: yellow[getShade(theme)]
  },
  error: {
    color: red[getShade(theme)]
  }
});

function Feed(props) {
  const { classes } = props;
  const { data, value } = useChannel(props);

  return (
    <Drawer anchor="bottom" variant="permanent" className={classes.root} classes={{ paper: classes.paper }}>
      <Label variant="body2" value={value}>
        {_.map(data, (line, i) => [
          <span key={line.timestamp + i}>{line.timestamp}</span>,
          <span className={classes[_.toLower(line.level)]}>&nbsp;{_.toUpper(line.level)}</span>,
          <span className={classes[_.toLower(line.level)]}>&nbsp;{line.message}</span>,
          <br />
        ])}
      </Label>
    </Drawer>
  );
}

export default withStyles(styles)(Feed);
