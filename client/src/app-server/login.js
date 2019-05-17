import { promises as fs } from 'fs';

import env from 'env-var';
import fastifyCookie from 'fastify-cookie';
import fastifyPlugin from 'fastify-plugin';
import React from 'react';

import reactRender from './renderer';
import App from '../login-client/src/app';

const USER_FILE_PATH = env.get('USER_FILE_PATH', './dev-files/users.json').asString();
const USER_DIRECTORY_PATH = env.get('USER_DIRECTORY_PATH', './apps').asString();

async function render() {
  const html = await fs.readFile('./dist/login.html');

  return reactRender(html, <App />);
}

async function loadApps() {
  const apps = new Map();
  const folders = await fs.readdir(USER_DIRECTORY_PATH);
  folders.forEach(async (folder) => {
    const appFolder = `${USER_DIRECTORY_PATH}/${folder}`;
    const appJsonFile = await fs.readFile(`${appFolder}/app.json`);
    const { password } = JSON.parse(appJsonFile);
    apps.set(password, appFolder);
  });
  return apps;
}
export default fastifyPlugin(async (app, options, next) => {
  const apps = await loadApps();
  app.register(fastifyCookie);

  app.get('/login', async (request, reply) => {
    const data = await render();

    reply.header('Content-Type', 'text/html');

    reply.send(data);
  });

  app.post('/login', async (request, reply) => {
    const { password } = request.body;

    if (apps.has(password)) {
      reply.setCookie('cred', password);
    }

    reply.send();
  });

  app.decorate('getApp', (request) => {
    return request.cookies &&
      request.cookies.cred &&
      apps.get(request.cookies.cred);
  });

  app.decorate('requireAuth', (request, reply) => {
    reply.redirect('/login');
  });

  next();
});
