import React from "react";
import {
  AppBar,
  Box,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";
import Title from "../components/Title";
import HeaderButtons from "./HeaderButtons";

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

const Header: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.placeholder} />
      <AppBar className={classes.container}>
        <Toolbar color="primary" className={classes.toolbar}>
          <Title />
          {children}
          <HeaderButtons />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
