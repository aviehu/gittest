import fs from 'fs';
import { promisify } from 'util';

import { transform } from '@babel/core';
import React from 'react';

import reactRender from './renderer';

import App from '../main-client/src/app';

const clientCodeBuilder = reactElement => `window.__TEMPLATE__ = ${reactElement}`;

global.React = React;

const transformAsync = promisify(transform);
const readFileAsync = promisify(fs.readFile);

export default async function render() {
  const template = `<div>hi</div>`;

  const htmlFile = (await readFileAsync('./dist/index.html')).toString();
  const reactElement = (await transformAsync(template)).code;
  const clientCode = (await transformAsync(clientCodeBuilder(template))).code;

  const script = `<script type="text/javascript">${clientCode}</script>`;
  const element = eval(reactElement); // eslint-disable-line no-eval

  return reactRender(htmlFile, <App element={element} />, script);
}
