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
    minWidth: 200,
    maxWidth: 275,
    margin: "auto"
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
  },
  actions: {
    display: "flex",
    flexDirection: "row-reverse"
  }
};

function SimpleCard(props) {
  const { classes, i } = props;
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          <Led color={i % 2 ? "primary" : "secondary"} />
          &nbsp;&nbsp;Camera {i}
        </Typography>
        <Typography color="textSecondary">Resolution: 1024 x 768</Typography>
        <Typography color="textSecondary">FPS: 24fps</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small">{i % 2 ? "Turn Off" : "Turn On"}</Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired
};

// function render(props) {
//   return (
//     <div>
//       <Button channel="toggleEngine" clickAction="toggle">
//         <Led channel="engineStatus" />
//         <Label>Engine</Label>
//       </Button>
//       <Button channel="leftButton" mouseDownAction="startLeft" mouseUpAction="stopLeft">
//         <Label>Left</Label>
//       </Button>
//       <Button channel="rightButton" mouseDownAction="startRight" mouseUpAction="stopRight">
//         <Label>Right</Label>
//       </Button>
//       <Card channel="camera1">
//         <Title>
//           <Led channelProperty="active" colors={{ 0: "secondary", 1: "primary" }} />
//           <Label>Camera 1</Label>
//         </Title>
//         <Label channelProperty="resolution" render={i => `Resolution: ${i}`} />
//         <Label channelProperty="fps" render={i => `FPS: ${i}`} />
//         <Button clickAction="toggle">
//           <Label channelProperty="active" render={i => (i === 1 ? "Turn Off" : "Turn on")} />
//         </Button>
//       </Card>
//     </div>
//   );
// }

// const topLevelProps = {

// }

export default withStyles(styles)(SimpleCard);
