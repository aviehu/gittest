const events = require("events");
const request = require("request");
const logger = require("logger");
const wheel = require("wheel");

const express = require("express");

const app = express();
const port = 80;

// switch case to handle all possible actions received via post
function handleAction(req, res) {
  const { channel, action, data } = req.body;
  if (req.body.channel !== "navigation") {
    return;
  }

  try {
    switch (req.body.action) {
      case "start": {
        events.emit("starter", { value: "START" }); // data may not be sent for some actions
        break;
      }
      case "stop": {
        events.emit("starter", { value: "STOP" });
        break;
      }
      case "accelerate": {
        events.emit("accelerator", data); // new pressure on accelerator
        break;
      }
      case "brake": {
        events.emit("brake", data); // new pressure on brake
        break;
      }
      case "turn": {
        wheel.turnTo(data); // new bearing data. Can also call functions/methods directly
        break;
      }
    }
    res.send(200);
    logger.info({ message: "action dispatched", req: req.body, result: "Success" });
  } catch (error) {
    logger.info({ message: "action error", req: req.body, result: "Error", error });
    res.send(500);
  }
}

app.use(express.json());
app.post("/action", handleAction);

// default state of the subsystem
let state = {
  started: false,
  heading: 0,
  speed: 0,
  y: 0,
  x: 0,
  z: 0
};

function buildActions() {
  if (state.started) {
    return ["stop", "accelerate", "brake", "turn"];
  }
  return ["start"];
}

// publish function sends data to the pubui api server
function publish(event, newData) {
  state = { state, ...newData };

  const actions = buildActions();

  request.post("https://<pubui api server address>/publish", {
    channel: "navigation",
    event,
    data: state,
    actions,
    url: "https://<ip address>/action"
  });
}

// listener function sends new fps and resolution data to pubui api server
function positionChange({ x, y, z }) {
  publish("position", { x, y, z });
}

function steeringChange({ heading }) {
  publish("steering", { heading });
}

function speedChange({ speed }) {
  publish("speed", { speed });
}

function startChange({ started }) {
  publish("startChange", { started });
}

function init() {
  // initialise input event listeners
  events.on("started", startChange);
  events.on("pos", positionChange);
  events.on("steering", steeringChange);
  events.on("speed", speedChange);

  // initialise action server
  app.listen(port, () => logger.info({ message: `Example app listening on port ${port}!` }));
}

function shutdown() {
  events.off("started", startChange);
  events.off("pos", positionChange);
  events.off("steering", steeringChange);
  events.off("speed", speedChange);
  app.close();
}

module.exports = { init, shutdown };
