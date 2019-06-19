const { get: getEnv } = require('env-var');
const websocketServer = require('./websocket-server');
const buildClientGateway = require('./clientGatewayServer');
const buildIngestServer = require('./ingestServer');

const env = getEnv('NODE_ENV', 'development').asString();
const binding = ['development', 'test'].includes(env) ? '127.0.0.1' : '0.0.0.0';

const ingestPort = getEnv('INGEST_PORT', '9002').asString();
const clientGatewayPort = getEnv('CLIENT_GATEWAY_PORT', '9001').asString();

const ingestServer = buildIngestServer({ swagger: true, port: ingestPort });

const wss = websocketServer({ port: clientGatewayPort, log: ingestServer.log });
buildClientGateway(wss, ingestServer.log);

ingestServer.listen(ingestPort, binding, (err, address) => {
  if (err) throw err;
  ingestServer.log.info(`ingress server listening on ${address}`);
});
