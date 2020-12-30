import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    secondary: { main: "#8bc34a", contrastText: "#fff" },
  },
  overrides: {
    // TODO: Fix
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: "1px solid rgba(255, 133, 51, 0.42)",
        },
        "&:after": {
          borderBottom: `2px solid white`,
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid white`,
        },
      },
    },
  },
});
