import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import Header from "../Dashboard/Header";

const useStyles = makeStyles(() => ({
  container: {
    background: "url('./backgrounds/login.jpg')",
    backgroundSize: "cover",
    height: "100vh",
    position: "relative",
  },
}));

const Container: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Header />
      {children}
    </Box>
  );
};

export default Container;
