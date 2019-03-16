// eslint-disable-next-line unicorn/filename-case
import React from "react";
import { MuiThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const styles = () => ({
  "@global": {
    body: {
      margin: "12px" // Overrides <CssBaseline/>
    }
  }
});

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    type: "dark"
  },
  typography: {
    useNextVariants: true
  }
});

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return withStyles(styles)(WithRoot);
}

export default withRoot;
