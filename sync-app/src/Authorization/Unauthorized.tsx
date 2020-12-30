import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import LogoutButton from "./LogoutButton";
import Container from "./Container";

const useStyles = makeStyles(() => ({
  buttonContainer: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: 24,
  },
}));

const Unauthorized: React.FC = () => {
  const classes = useStyles();
  return (
    <Container
      title="Unauthorized access"
      backgroundImage="./backgrounds/permission-denied.png"
    >
      <Box className={classes.buttonContainer}>
        <LogoutButton />
      </Box>
    </Container>
  );
};

export default Unauthorized;
