const { get: getEnv } = require('env-var');
const WebSocket = require('ws');
const buildClientGateway = require('./clientGatewayServer');
const buildIngestServer = require('./ingestServer');

const ingestPort = getEnv('INGEST_PORT', '8000').asString();
const clientGatewayPort = getEnv('CLIENT_GATEWAY_PORT', '9001').asString();

const wss = new WebSocket.Server({ port: clientGatewayPort });
buildClientGateway(wss);

const ingestServer = buildIngestServer({ swagger: true, port: ingestPort });

ingestServer.listen(ingestPort, (err, address) => {
  if (err) throw err;
  ingestServer.log.info(`ingress server listening on ${address}`);
});
