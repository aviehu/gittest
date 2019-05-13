import React, { useLayoutEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({});

function App({ element }) {
  useLayoutEffect(() => {
    document.onkeydown = evt => {
      if (evt.altKey && evt.code === 'KeyL') {
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i += 1) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf('=');
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }

        document.location = '/login';
      }
    };
  }, []);

  return <div>{element}</div>;
}

export default withStyles(styles)(App);
