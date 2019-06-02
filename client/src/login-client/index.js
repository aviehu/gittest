import React from 'react';

import start from '../ssr/client';

import App from './app';

start(() => <App />);
