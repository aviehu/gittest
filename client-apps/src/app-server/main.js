import { promises as fs } from 'fs';

import { transformAsync } from '@babel/core';
import fastifyPlugin from 'fastify-plugin';
import React from 'react';
import { VM } from 'vm2';

import reactRender from './renderer';

import App from '../main-client/src/app';

function run(reactElementCode) {
  const vm = new VM({
    sandbox: {
      React
    }
  });

  return vm.run(reactElementCode);
}

async function render(templateFilePath) {
  const template = await fs.readFile(templateFilePath);
  const htmlFile = await fs.readFile('./dist/index.html');

  const babelConfig = {
    configFile: false,
    presets: ['@babel/preset-react']
  };

  const reactElement = (await transformAsync(template, babelConfig)).code;

  const clientCode = `window.__TEMPLATE__ = ${reactElement}`;

  const script = `<script type="text/javascript">${clientCode}</script>`;

  return reactRender(htmlFile, <App element={run(reactElement)} />, script);
}

export default fastifyPlugin((app, options, next) => {
  app.get('/', async (request, reply) => {
    const user = app.getUser(request);

    if (!user) {
      app.requireAuth(request);
      return;
    }

    const data = await render(user);

    reply.header('Content-Type', 'text/html');

    reply.send(data);
  });

  next();
});
