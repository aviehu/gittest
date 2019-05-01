const uuidv1 = require('uuid/v1');

function failed(ws, message, response) {
  ws.send({ id: uuidv1(), reqId: message.id, type: 'error', errors: response.errors || 'UNKNOWN_LIVEU_SERVER_ERROR' });
}

module.exports = failed;
