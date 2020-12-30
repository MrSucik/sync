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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      justifyContent: "space-between",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.getContrastText(theme.palette.primary.main),
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
      <AppBar>
        <Toolbar color="primary" className={classes.toolbar}>
          <Typography variant="h6" component="h1">
            Sync
          </Typography>
          <LogoutButton />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
