import map from 'lodash/map';
import toLower from 'lodash/toLower';
import toUpper from 'lodash/toUpper';
import React from 'react';
import classNames from 'classnames';
import { Drawer, Divider, Table, TableBody, TableCell, TableRow, IconButton, withStyles } from '@material-ui/core';
import { blue, red, grey, yellow } from '@material-ui/core/colors';

import DeleteIcon from '@material-ui/icons/Delete';
import useChannel from '../hooks/use-channel';
import Label from './label';
import mapRight from '../lodash-ext/mapRight';

const drawerHeight = 200;
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
    opacity: 0.9,
    height: drawerHeight,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    marginRight: theme.spacing.unit * 1.5,
    marginLeft: theme.spacing.unit * 1.5,
    '&::-webkit-scrollbar': {
      width: 10
    },
    '&::-webkit-scrollbar-track': {
      background: '#424242',
      borderLeft: '1px solid #888'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888'
    },
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
  },
  table: {},
  tableRow: {
    height: 20
  },
  tableCell: {
    padding: 0,
    paddingRight: theme.spacing.unit * 2,
    border: 0
  },
  noStretch: {
    width: '1%',
    whiteSpace: 'nowrap'
  },
  clearButton: {
    position: 'fixed',
    bottom: 0,
    right: theme.spacing.unit
  }
});

function Feed(props) {
  const { classes, reverseFeed, title, titleVariant = 'h5' } = props;
  const { data, clearData } = useChannel({ ...props, initialData: [] });

  const mapper = reverseFeed ? mapRight : map;

  return (
    <Drawer anchor="bottom" variant="permanent" className={classes.root} classes={{ paper: classes.paper }}>
      <Label variant={titleVariant}>{title}</Label>
      {title && <Divider />}
      <Table className={classes.table}>
        <TableBody>
          {mapper(data, (line, i) => (
            <TableRow key={i} className={classes.tableRow}>
              <TableCell className={classNames(classes.tableCell, classes.noStretch)}>
                <Label variant="body2">{new Date(line.timestamp).toISOString()}</Label>
              </TableCell>
              <TableCell className={classNames(classes.tableCell, classes.noStretch)}>
                <Label variant="body2" className={classes[toLower(line.level)]}>
                  {toUpper(line.level)}
                </Label>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Label variant="body2" className={classes[toLower(line.level)]}>
                  {line.message}
                </Label>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <IconButton aria-label="Delete" className={classes.clearButton} onClick={clearData}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Drawer>
  );
}

export default withStyles(styles)(Feed);
