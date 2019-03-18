/* eslint-disable unicorn/filename-case */

import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, AppBar, Toolbar, Button, Card, CardContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "./withRoot";
import SimpleCard from "./SimpleCard";
import Feed from "./Feed";

const styles = theme => ({
  root: {
    textAlign: "left",
    flexGrow: 1
  },
  icon: {
    marginLeft: -12,
    marginRight: 20
  },
  grow: {
    flexGrow: 1
  },
  content: {
    margin: 12,
    [theme.breakpoints.up("lg")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 1300
    }
  },
  appBar: {
    backgroundImage: "url(/hp_menu_bg.jpg)",
    backgroundSize: "cover",
    backgroundPostion: "center"
  },
  card: {
    minWidth: 200,
    maxWidth: 275,
    margin: "auto"
  },
  gridContainer: {
    marginBottom: 8
  }
});

function App({ classes }) {
  // const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <img
            className={classes.icon}
            // style={{ position: "absolute", right: 12, top: 12 }}
            src="/2880px-LiveU_logo.svg.png"
            alt="live u logo"
            height="40px"
          />
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Pub Ui
          </Typography>
          <div className={classes.grow} />
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        {/* <Paper className={classes.paper} paddingBottom> */}
        <Typography variant="h4" gutterBottom>
          Cameras
        </Typography>
        <Grid
          container
          spacing={16}
          justify="flex-start"
          direction="row"
          alignItems="center"
          classes={{ container: classes.gridContainer }}
        >
          <Grid item xl={2} lg={3} md={3} xs={12}>
            <SimpleCard i="1" />
          </Grid>
          <Grid item xl={2} lg={3} md={3} xs={12}>
            <SimpleCard i="2" />
          </Grid>
          <Grid item xl={2} lg={3} md={3} xs={12}>
            <SimpleCard i="3" />
          </Grid>
          <Grid item xl={2} lg={3} md={3} xs={12}>
            <SimpleCard i="4" />
          </Grid>
        </Grid>
        <Typography variant="h4" gutterBottom>
          Vehicle Info
        </Typography>
        <Grid
          container
          spacing={16}
          justify="flex-start"
          direction="row"
          alignItems="center"
          classes={{ container: classes.gridContainer }}
        >
          <Grid item md={3} xs={12}>
            <Card className={classes.card}>
              <Typography variant="h5" component="h2" gutterBottom>
                OBD
              </Typography>
              <CardContent>
                <Typography color="textSecondary">
                  <span>Speed (kph):</span>&nbsp;45
                </Typography>
                <Typography color="textSecondary">
                  <span>RPM:</span>&nbsp;100
                </Typography>
                <Typography color="textSecondary">
                  <span>Fuel:</span>&nbsp;45%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
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
              </CardContent>
            </Card>
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
    </div>
  );
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(App));
