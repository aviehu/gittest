const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ipcMain } = require('electron');

let messages = [];

ipcMain.on('getNewMessages', (event, arg) => {
  event.returnValue = messages;
  messages = [];
});
module.exports = function start() {
  const app = express();
  const port = 8001;
  app.use(bodyParser.json());
  app.post('*', (req, res) => {
    console.log(req.body);
    messages.push(_.pick(req, ['body', 'path']));
    res.sendStatus(200);
  });
  app.listen(port);
  console.log(`listening on port ${port}!`);
};
