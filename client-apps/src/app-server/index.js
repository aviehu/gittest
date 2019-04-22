import path from 'path';

import fastify from 'fastify';
import fastifyStatic from 'fastify-static';

import loginSetup from './login';
import mainSetup from './main';

const app = fastify({
  // logger: {
  //   level: 'trace'
  // }
});

app.register(fastifyStatic, {
  root: path.resolve('dist')
});

loginSetup(app);
mainSetup(app);

const start = async () => {
  try {
    await app.listen(3000);
  } catch (error) {
    app.log.error(error);
  }
};
start();
