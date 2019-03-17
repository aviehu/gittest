/* eslint-disable unicorn/filename-case */

import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { Drawer, Typography, withStyles } from "@material-ui/core";

const drawerHeight = 240;

const styles = {
  root: { overflow: "auto", height: drawerHeight, flexShrink: 0 },
  paper: {
    height: drawerHeight,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    "&::-webkit-scrollbar": {
      width: 10
    },

    /* Track */
    "&::-webkit-scrollbar-track": {
      background: "#424242",
      borderLeft: "1px solid #888"
    },

    /* Handle */
    "&::-webkit-scrollbar-thumb": {
      background: "#888"
    },

    /* Handle on hover */
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555"
    }
  }
};

function Feed(props) {
  const { classes } = props;
  return (
    <Drawer
      anchor="bottom"
      variant="permanent"
      className={classes.root}
      classes={{ paper: classes.paper }}
    >
      <Typography variant="body2">
        {_.flatMap(i => [`Log ${i}`, <br />])(_.range(50, 0))}
      </Typography>
    </Drawer>
  );
}

Feed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Feed);
