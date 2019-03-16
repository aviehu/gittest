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
      <Typography variant="h4" gutterBottom>
        Cameras
      </Typography>
      <Grid container spacing={24} alignItems="center">
        <Grid item md={3}>
          <SimpleCard i="1" />
        </Grid>
        <Grid item md={3}>
          <SimpleCard i="2" />
        </Grid>
        <Grid item md={3}>
          <SimpleCard i="3" />
        </Grid>
        <Grid item md={3}>
          <SimpleCard i="4" />
        </Grid>
        <Grid item md={3}>
          <SimpleCard i="5" />
        </Grid>
      </Grid>
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
