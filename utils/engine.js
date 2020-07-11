import React from 'react';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import _ from "lodash";

let moduleDetectRegEx;

module.exports = function(filePath, options, callback) {
  if (!moduleDetectRegEx) {
    // Path could contain regexp characters so escape it first.
    // options.settings.views could be a single string or an array
    moduleDetectRegEx = new RegExp(
      []
      .concat(options.settings.views)
      .map(viewPath => '^' + _.escapeRegExp(viewPath))
      .join('|')
    );
  }

  let markup;

  try {
    const sheets = new ServerStyleSheets();

    let component = require(filePath);
    component = component.default || component;
    const { settings, _locals, ...props } = options;
    // Render the component to a string.
    const html = ReactDOMServer.renderToString(
      sheets.collect(
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {React.createElement(component, props)}
        </ThemeProvider>,
      ),
    );

    // Grab the CSS from our sheets.
    const css = sheets.toString();

    markup = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Tech Store</title>
        <style id="jss-server-side">${css}</style>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </head>
      <body>
        <script async src="/build/${path.basename(filePath, ".js")}.bundle.js"></script>
        <script>window.bootstrappedViewData = ${JSON.stringify(props)}</script>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
  } catch (err) {
    return callback(err);
  } finally {
    if (options.settings.env === 'development') {
      // Remove all files from the module cache that are in the view folder.
      Object.keys(require.cache).forEach(function(module) {
        if (moduleDetectRegEx.test(require.cache[module].filename)) {
          delete require.cache[module];
        }
      });
    }
  }

  return callback(null, markup);
}
