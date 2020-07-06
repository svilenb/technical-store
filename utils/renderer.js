import React from 'react';
import ReactDOMServer from 'react-dom/server';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import Index from '../views/index';
import theme from './theme';

module.exports = {
  renderFullPage: function(title = "Tech Store") {
    const sheets = new ServerStyleSheets();

    // Render the component to a string.
    const html = ReactDOMServer.renderToString(
      sheets.collect(
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Index />
        </ThemeProvider>,
      ),
    );

    // Grab the CSS from our sheets.
    const css = sheets.toString();

    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${title}</title>
        <style id="jss-server-side">${css}</style>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </head>
      <body>
        <script async src="build/index.bundle.js"></script>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
  }
}
