import cheerio from 'cheerio';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';

import theme from '../ssr/theme';

export default function render(html, element, additionalScript) {
  const $ = cheerio.load(html);

  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance.
  const sheetsManager = new Map();

  // Create a new class name generator.
  const generateClassName = createGenerateClassName();

  const body = ReactDOMServer.renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        {element}
      </MuiThemeProvider>
    </JssProvider>
  );

  // // Grab the CSS from our sheetsRegistry.
  const css = sheetsRegistry.toString();

  $('head').append(`<style id="jss-server-side">${css}</style>`);

  if (additionalScript) {
    $('body').append(additionalScript);
  }

  $('#app')
    .empty()
    .append(body);

  return $.html();
}
