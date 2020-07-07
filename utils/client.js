import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Index from '../views/index';
import theme from './theme';

function ClienWrapper({ children }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

module.exports = {
  hydrate: function(component) {
    ReactDOM.hydrate(
      <ClienWrapper>
        {React.createElement(component)}
      </ClienWrapper>, document.querySelector('#root'));
  }
}
