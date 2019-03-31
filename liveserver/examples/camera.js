const readConfig = require("cameraConfigReader");
const events = require("events");
const request = require("request");

// default state is just the config of the connected camera
const config = readConfig("camera1");
let state = {
  ...config
};

// publish function sends data to the pubui api server
function publish(event, newData) {
  state = { state, ...newData };
  request.post("https://<pubui api server address>/publish", {
    channel: "camera1",
    event,
    data: state
  });
}

// listener function sends new fps and resolution data to pubui api server
function camera1ConfigChange({ fps, resolution }) {
  publish("config.change", { fps, resolution });
}

function init() {
  events.on("camera1.config", camera1ConfigChange);
}

function shutdown() {
  events.off("camera1.config", camera1ConfigChange);
}

module.exports = { init, shutdown };
