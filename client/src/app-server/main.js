import { promises as fs } from 'fs';

import env from 'env-var';
import { transformAsync } from '@babel/core';
import fastifyPlugin from 'fastify-plugin';
import React from 'react';
import { VM } from 'vm2';

const WEBSOCKET_SERVER_URL = env.get('WEBSOCKET_SERVER_URL', 'ws://localhost:9001').asString();

import reactRender from './renderer';

import App from '../main-client/app';
import * as globals from '../main-client/globals';

function run(reactElementCode) {
  const vm = new VM({
    sandbox: globals
  });

  return vm.run(reactElementCode);
}

function addAppBar(template, { title }) {
  return `<Root title="${title}">${template}</Root>`;
}

async function render(appFolder) {
  const htmlFile = await fs.readFile('./dist/index.html');
  const options = JSON.parse(await fs.readFile(`${appFolder}/app.json`));
  const template = addAppBar(await fs.readFile(`${appFolder}/App.jsx`), options);

  const babelConfig = {
    configFile: false,
    presets: ['@babel/preset-react']
  };

  const reactElement = (await transformAsync(template, babelConfig)).code;

  const clientCode = `
  window.__TEMPLATE__ = ${reactElement};
  window.WEBSOCKET_SERVER_URL = "${WEBSOCKET_SERVER_URL}";
  `;

  const script = `<script type="text/javascript">${clientCode}</script>`;

  return reactRender(htmlFile, <App element={run(reactElement)} options={options} />, script);
}

export default fastifyPlugin((router, options, next) => {
  router.get('/', async (request, reply) => {
    const authorizedApp = router.getApp(request);

    if (!authorizedApp) {
      router.requireAuth(request, reply);
      return;
    }

    const data = await render(authorizedApp);

    reply.header('Content-Type', 'text/html');

    reply.send(data);
  });

  next();
});
