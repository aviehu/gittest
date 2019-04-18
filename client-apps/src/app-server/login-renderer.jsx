import fs from 'fs';
import React from 'react';

import reactRender from './renderer';

import App from '../login-client/src/app';

export default async function render() {
  return new Promise(resolve => {
    fs.readFile('./dist/login.html', (error, data) => {
      resolve(reactRender(data.toString(), <App />));
    });
  });
}
