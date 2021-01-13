import React from "react";
import {
  AppBar,
  Box,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import LogoutButton from "../Authorization/LogoutButton";
import UsersAdministrationIconButton from "../Users/UsersAdministrationIconButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    toolbar: {
      justifyContent: "space-between",
    },
    placeholder: {
      height: 64,
    },
  })
);

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.placeholder} />
      <AppBar className={classes.container}>
        <Toolbar color="primary" className={classes.toolbar}>
          <Typography
            style={{ fontFamily: "'B612 Mono', monospace" }}
            variant="h4"
            component="h1"
          >
            sync
          </Typography>
          <Box display="flex">
            <UsersAdministrationIconButton />
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
