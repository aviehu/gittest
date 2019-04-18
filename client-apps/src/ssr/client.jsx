import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';

import theme from './theme';

// import './globals';
// import App from './app';

function Main({ element }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.remove();
    }
  });

  return element;
}

// Create a new class name generator.
const generateClassName = createGenerateClassName();

export default function start(elementFn) {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      ReactDOM.hydrate(
        <JssProvider generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme}>
            <Main element={elementFn()} />
          </MuiThemeProvider>
        </JssProvider>,
        document.querySelector('#app')
      );
    },
    false
  );
}
