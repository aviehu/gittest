import React from 'react';
import { render } from 'react-dom';

import * as globals from './globals';
import App from './app';

Object.assign(window, globals);

window.__TEMPLATE__ = <Label channel="test">hi</Label>;

render(<App element={window.__TEMPLATE__} />, document.querySelector('#app'));
