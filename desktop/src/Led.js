/* eslint-disable unicorn/filename-case */
import React from "react";
import PropTypes from "prop-types";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  badge: {
    position: "relative",
    transform: "none"
  },
  colorPrimary: {
    backgroundColor: "#4caf50"
  },
  colorSecondary: {
    backgroundColor: "#f44336"
  }
};

function Led(props) {
  return <Badge {...props} />;
}

Led.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Badge);
