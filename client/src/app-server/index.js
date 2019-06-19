import path from 'path';

import { get as getEnv } from 'env-var';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';

import loginSetup from './login';
import mainSetup from './main';

const PORT = getEnv('PORT', '3000').asIntPositive();
const env = getEnv('NODE_ENV', 'development').asString();
const binding = ['development', 'test'].includes(env) ? '127.0.0.1' : '0.0.0.0';

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
    await app.listen(PORT, binding);
  } catch (error) {
    app.log.error(error);
  }
};
start();
