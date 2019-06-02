import React from 'react';
import { render } from 'react-dom';

import * as globals from './globals';
import App from './app';

Object.assign(window, globals);

window.__TEMPLATE__ = <div>hi</div>;

render(<App element={window.__TEMPLATE__} />, document.querySelector('#app'));
