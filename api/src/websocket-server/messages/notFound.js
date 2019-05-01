const uuidv1 = require('uuid/v1');

function notFound(ws, message) {
  ws.sendJson({ id: uuidv1(), reqId: message.id, type: 'notFound', errors: ['message handler not found'] });
}

module.exports = notFound;
