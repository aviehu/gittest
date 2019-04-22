const uuidv1 = require('uuid/v1');

function success(ws, message) {
  ws.send({ id: uuidv1(), reqId: message.id, type: 'success' });
}

module.exports = success;
