import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: { main: "rgb(66, 96, 143)" },
    secondary: { main: "#8bc34a", contrastText: "#fff" },
    background: { paper: "transparent", default: "rgb(66, 96, 143)" },
  },
});
