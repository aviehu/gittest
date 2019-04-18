import React from 'react';
import { render } from 'react-dom';

import App from './app';

window.__TEMPLATE__ = <div>hi</div>;

render(<App element={window.__TEMPLATE__} />, document.querySelector('#app'));
