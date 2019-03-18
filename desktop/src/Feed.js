/* eslint-disable unicorn/filename-case */

import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { Drawer, Typography, withStyles } from "@material-ui/core";
import { blue, red, grey, yellow } from "@material-ui/core/colors";
import { LoremIpsum } from "lorem-ipsum";

const drawerHeight = 240;
const shade = 200; // dark theme
// const shade = 500; // light theme

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
  },
  debug: {
    color: grey[shade + 200]
  },
  info: {
    color: blue[shade]
  },
  warn: {
    color: yellow[shade]
  },
  error: {
    color: red[shade]
  }
};

const classifications = ["debug", "info", "warn", "error"];
const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

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
        {_.flatMap(i => [
          <span>{new Date().toISOString()} </span>,
          <span className={classes[classifications[i % 4]]}>
            {_.toUpper(classifications[i % 4])} {lorem.generateSentences(1)}
          </span>,
          <br />
        ])(_.range(50, 0))}
      </Typography>
    </Drawer>
  );
}

Feed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Feed);
