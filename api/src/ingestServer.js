const fastify = require('fastify');
const forEach = require('lodash/fp/forEach');
const fastifySensible = require('fastify-sensible');
const fastifySwagger = require('fastify-swagger');
const statusCodes = require('http').STATUS_CODES;
const messageSchema = require('./schemas/message.json');
const { getSubscribers } = require('./subscribers');
const cache = require('./cache');

const schema = {
  body: messageSchema
};

function buildServer({ swagger = false, port } = {}) {
  const app = fastify({
    logger: true,
    trustProxy: true,
    caseSensitive: false,
    ignoreTrailingSlash: true
  });

  app.register(fastifySensible, { errorHandler: false });

  if (swagger) {
    // swagger config
    app.register(fastifySwagger, {
      routePrefix: '/docs',
      exposeRoute: true,
      swagger: {
        info: {
          title: 'PubUI Ingest API Smaller Faster Better',
          description: 'PubUI Ingest Swagger API',
          version: '0.1.0'
        },
        host: `127.0.0.1:${port}`,
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
        // securityDefinitions: {
        //   apiKey: {
        //     type: 'apiKey',
        //     name: 'X-API-KEY',
        //     in: 'header'
        //   }
        // }
      }
    });
  }

  app.setErrorHandler((error, req, reply) => {
    const { res } = reply;
    if (res.statusCode >= 500) {
      res.log.error({ req: reply.request.raw, res, err: error }, error && error.message);
      return reply.send(new Error('Something went wrong'));
    }

    res.log.info({ req: reply.request.raw, res, err: error }, error && error.message);
    if (error.validation) {
      reply.status(422);
    }

    return reply.send({
      error: statusCodes[`${res.statusCode}`],
      message: error ? error.message : '',
      statusCode: res.statusCode,
      data: error.data
    });
  });

  app.post('/publish', { schema }, (request, reply) => {
    // const { source, channel, callback, event, data, actions } = request.body;
    const { channel } = request.body;
    reply.send('ok');

    const cachedMessage = { ...request.body, type: 'forward' };
    cache.set(channel, cachedMessage);
    forEach(subscriber => subscriber.sendJson(cachedMessage))(getSubscribers(channel));
  });

  process.on('SIGINT', async () => {
    await app.close();
    process.exit(0);
  });

  return app;
}

module.exports = buildServer;
