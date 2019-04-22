const uuidv1 = require('uuid/v1');

function invalid(ws, message, errors) {
  ws.send({ id: uuidv1(), reqId: message.id, type: 'invalid', errors });
}

module.exports = invalid;
