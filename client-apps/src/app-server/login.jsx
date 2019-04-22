import crypto from 'crypto';
import fs from 'fs';

import fastifyCookie from 'fastify-cookie';
import React from 'react';

import reactRender from './renderer';
import App from '../login-client/src/app';

const USER_FILE_PATH = process.env.USER_FILE_PATH || './dev-files/users.json';

function render() {
  return new Promise(resolve => {
    fs.readFile('./dist/login.html', (error, data) => {
      resolve(reactRender(data.toString(), <App />));
    });
  });
}

export default function setup(app) {
  app.register(fastifyCookie);

  const users = JSON.parse(fs.readFileSync(USER_FILE_PATH));

  app.get('/login', async (request, reply) => {
    const data = await render();

    reply.header('Content-Type', 'text/html');

    reply.send(data);
  });

  app.post('/login', async (request, reply) => {
    const { password } = request.body;

    const hash = crypto.createHash('sha512');

    hash.update(password);
    const hashedPassword = hash.digest('hex');

    if (users[hashedPassword]) {
      reply.setCookie('cred', hashedPassword);
    }

    reply.send();
  });

  app.decorate('getUser', request => request.cookies && request.cookies.cred && users[request.cookies.cred]);

  app.decorate('checkAuth', (request, reply) => {
    if (request.cookies && request.cookies.cred) {
      const hashedPassword = request.cookies.cred;

      if (users[hashedPassword]) {
        return true;
      }
    }

    reply.redirect('/login');
    return false;
  });
}
