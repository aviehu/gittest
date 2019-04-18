import React from 'react';

import './globals';
import start from '../../ssr/client';

import App from './app';

start(() => <App element={window.__TEMPLATE__} />);
