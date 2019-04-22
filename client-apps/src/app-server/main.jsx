import fs from 'fs';
import { promisify } from 'util';

import { transformAsync } from '@babel/core';
import React from 'react';
import { VM } from 'vm2';

import reactRender from './renderer';

import App from '../main-client/src/app';

const readFileAsync = promisify(fs.readFile);

function run(reactElementCode) {
  const vm = new VM({
    sandbox: {
      React
    }
  });

  return vm.run(reactElementCode);
}

async function render(templateFilePath) {
  const template = (await readFileAsync(templateFilePath)).toString();
  const htmlFile = (await readFileAsync('./dist/index.html')).toString();

  const babelConfig = {
    configFile: false,
    presets: ['@babel/preset-react']
  };

  const reactElement = (await transformAsync(template, babelConfig)).code;

  const clientCode = `window.__TEMPLATE__ = ${reactElement}`;

  const script = `<script type="text/javascript">${clientCode}</script>`;

  return reactRender(htmlFile, <App element={run(reactElement)} />, script);
}

export default function setup(app) {
  app.get('/', async (request, reply) => {
    if (!app.checkAuth(request, reply)) {
      return;
    }

    const templateFilePath = app.getUser(request);

    const data = await render(templateFilePath);

    reply.header('Content-Type', 'text/html');

    reply.send(data);
  });
}
