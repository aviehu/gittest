import React from 'react';

import * as globals from './globals';
import start from '../ssr/client';

import App from './app';

Object.assign(window, globals);

start(() => <App element={window.__TEMPLATE__} />);
