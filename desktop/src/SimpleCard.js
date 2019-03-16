/* eslint-disable unicorn/filename-case */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Led from "./Led";

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

function SimpleCard(props) {
  const { classes, i } = props;
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Camera {i}
        </Typography>
        <Typography component="h3" padding="12px">
          <Led color={i % 2 ? "primary" : "secondary"} />
          &nbsp;&nbsp;{i % 2 ? "Active" : "Link Cut"}
        </Typography>
        <Typography component="h3">1024 x 768</Typography>
        <Typography component="h3">24fps</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">color={i % 2 ? "Turn Off" : "Turn On"}</Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired
};

export default withStyles(styles)(SimpleCard);
