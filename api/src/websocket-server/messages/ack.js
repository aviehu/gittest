const uuidv1 = require('uuid/v1');

function ack(ws, message) {
  ws.send({ id: uuidv1(), reqId: message.id, type: 'ack' });
}

module.exports = ack;
