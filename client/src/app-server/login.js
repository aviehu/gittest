import { promises as fs } from 'fs';

import env from 'env-var';
import fastifyCookie from 'fastify-cookie';
import fastifyPlugin from 'fastify-plugin';
import React from 'react';
import map from 'lodash/map';

import reactRender from './renderer';
import LoginApp from '../login-client/src/app';

const USER_DIRECTORY_PATH = env.get('USER_DIRECTORY_PATH', './apps').asString();

async function render() {
  const html = await fs.readFile('./dist/login.html');

  return reactRender(html, <LoginApp />);
}

async function loadApps() {
  const apps = new Map();
  const folders = await fs.readdir(USER_DIRECTORY_PATH);
  await Promise.all(
    map(folders, async folder => {
      const appFolder = `${USER_DIRECTORY_PATH}/${folder}`;
      const appJsonFile = await fs.readFile(`${appFolder}/app.json`, { encoding: 'utf8' });
      const { password } = JSON.parse(appJsonFile);
      return apps.set(password, appFolder);
    })
  );

  return apps;
}
export default fastifyPlugin(async (router, options, next) => {
  const apps = await loadApps();
  router.register(fastifyCookie);

  router.get('/login', async (request, reply) => {
    const data = await render();

    reply.header('Content-Type', 'text/html');

    reply.send(data);
  });

  router.post('/login', async (request, reply) => {
    const { password } = request.body;

    if (apps.has(password)) {
      reply.setCookie('cred', password);
    }

    reply.send();
  });

  router.decorate('getApp', request => {
    return request.cookies && request.cookies.cred && apps.get(request.cookies.cred);
  });

  router.decorate('requireAuth', (request, reply) => {
    reply.redirect('/login');
  });

  next();
});
