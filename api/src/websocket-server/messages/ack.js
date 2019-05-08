const uuidv1 = require('uuid/v1');

function ack(ws, message) {
  ws.sendJson({ id: uuidv1(), reqId: message.id, type: 'ack' });
}

module.exports = ack;
