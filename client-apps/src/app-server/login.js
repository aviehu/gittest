import { promises as fs } from 'fs';

import env from 'env-var';
import fastifyCookie from 'fastify-cookie';
import fastifyPlugin from 'fastify-plugin';
import React from 'react';

import reactRender from './renderer';
import App from '../login-client/src/app';

const USER_FILE_PATH = env.get('USER_FILE_PATH', './dev-files/users.json').asString();

async function render() {
  const html = await fs.readFile('./dist/login.html');

  return reactRender(html, <App />);
}

export default fastifyPlugin(async (app, options, next) => {
  app.register(fastifyCookie);

  const users = JSON.parse(await fs.readFile(USER_FILE_PATH));

  app.get('/login', async (request, reply) => {
    const data = await render();

    reply.header('Content-Type', 'text/html');

    reply.send(data);
  });

  app.post('/login', async (request, reply) => {
    const { password } = request.body;

    if (users[password]) {
      reply.setCookie('cred', password);
    }

    reply.send();
  });

  app.decorate('getUser', request => request.cookies && request.cookies.cred && users[request.cookies.cred]);

  app.decorate('requireAuth', (request, reply) => {
    reply.redirect('/login');
  });

  next();
});
