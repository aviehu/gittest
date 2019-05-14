import map from 'lodash/map';
import reduceRight from 'lodash/reduceRight';
import toLower from 'lodash/toLower';
import toUpper from 'lodash/toUpper';
import React from 'react';
import { Drawer, withStyles } from '@material-ui/core';
import { blue, red, grey, yellow } from '@material-ui/core/colors';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import useChannel from '../hooks/use-channel';
import Label from './label';

function mapRight(collection, iteratee) {
  return reduceRight(
    collection,
    (acc, ...rest) => {
      acc.push(iteratee(...rest));
      return acc;
    },
    []
  );
}

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
  },
  tableRow: {
    height: 20
  },
  tableCell: {
    padding: 0,
    border: 0
  }
});

function Feed(props) {
  const { classes, reverseFeed } = props;
  const { data } = useChannel(props);

  const mapper = reverseFeed ? mapRight : map;

  return (
    <Drawer anchor="bottom" variant="permanent" className={classes.root} classes={{ paper: classes.paper }}>
      <Table>
        <TableBody>
          {mapper(data, (line, i) => (
            <TableRow key={i} className={classes.tableRow}>
              <TableCell className={classes.tableCell}>
                <Label variant="body2">{line.timestamp}</Label>
              </TableCell>
              <TableCell className={classes.tableCell}>
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
    </Drawer>
  );
}

export default withStyles(styles)(Feed);
