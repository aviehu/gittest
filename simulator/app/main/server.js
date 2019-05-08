const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ipcMain } = require('electron');
const { get: getEnv } = require('env-var');

let messages = [];

ipcMain.on('getNewMessages', (event, arg) => {
  event.returnValue = messages;
  messages = [];
});
module.exports = function start() {
  const app = express();
  const port = getEnv('API_PORT', 8001).asIntPositive();
  app.use(bodyParser.json());
  app.post('*', (req, res) => {
    messages.push(_.pick(req, ['body', 'path']));
    res.sendStatus(200);
  });
  app.listen(port);
  console.log(`listening on port ${port}!`);
};
