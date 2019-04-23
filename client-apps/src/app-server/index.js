import path from 'path';

import env from 'env-var';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';

import loginSetup from './login';
import mainSetup from './main';

const PORT = env.get('PORT', '3000').asIntPositive();

const app = fastify({
  logger: true,
  trustProxy: true,
  caseSensitive: false,
  ignoreTrailingSlash: true
});

app.register(fastifyStatic, {
  root: path.resolve('dist')
});

app.register(loginSetup);
app.register(mainSetup);

const start = async () => {
  try {
    await app.listen(PORT);
  } catch (error) {
    app.log.error(error);
  }
};
start();
