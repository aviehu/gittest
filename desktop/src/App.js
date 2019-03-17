/* eslint-disable unicorn/filename-case */

import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
// import Card from "@material-ui/core/Card";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "./withRoot";
import SimpleCard from "./SimpleCard";
import Feed from "./Feed";

const styles = theme => ({
  root: {
    textAlign: "left",
    paddingTop: theme.spacing.unit * 1
  }
});

function App({ classes }) {
  // const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      {/* <Paper className={classes.paper} paddingBottom> */}
      <Grid container spacing={24} alignItems="center">
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="h4" gutterBottom>
            Cameras
          </Typography>
        </Grid>
        <Grid item md={3} xs={12}>
          <SimpleCard i="1" />
        </Grid>
        <Grid item md={3} xs={12}>
          <SimpleCard i="2" />
        </Grid>
        <Grid item md={3} xs={12}>
          <SimpleCard i="3" />
        </Grid>
        <Grid item md={3} xs={12}>
          <SimpleCard i="4" />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Typography variant="h4" gutterBottom>
            OBD
          </Typography>
          <Typography color="textSecondary">
            <span>Speed (kph):</span>&nbsp;45
          </Typography>
          <Typography color="textSecondary">
            <span>RPM:</span>&nbsp;100
          </Typography>
          <Typography color="textSecondary">
            <span>Fuel:</span>&nbsp;45%
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography variant="h4" gutterBottom>
            GPS
          </Typography>
          <Typography color="textSecondary">
            <span>X:</span>&nbsp;40.7600000
          </Typography>
          <Typography color="textSecondary">
            <span>Y:</span>&nbsp;-73.9840000
          </Typography>
          <Typography color="textSecondary">
            <span>Z:</span>&nbsp;0.1300000
          </Typography>
        </Grid>
      </Grid>
      <Feed />
      {/* </Paper> */}
      {/* <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              OBD
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              GPS
            </Typography>
          </Paper>
        </Grid>
      </Grid> */}
      {/* <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Super Secret Password</DialogTitle>
        <DialogContent>
          <DialogContentText>1-2-3-4-5</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setOpen(false)}>
            OK
          </Button>
        </DialogActions>
      </Dialog> */}
      {/* <Typography variant="subtitle1" gutterBottom>
        example project
      </Typography>
      <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>
        Super Secret Password
      </Button> */}
    </div>
  );
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(App));
