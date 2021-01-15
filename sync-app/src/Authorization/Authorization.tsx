import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import Container from "./Container";
import LoginButton from "./LoginButton";
import { useAuthorization } from "./useAuthorization";
import Dashboard from "../Dashboard/Dashboard";
import Loading from "../components/Loading";

const useStyles = makeStyles(() => ({
  buttonContainer: {
    transform: "translate(-50%, -50%)",
    position: "absolute",
    top: "50%",
    left: "50%",
  },
}));

const Authorization: React.FC = () => {
  const classes = useStyles();
  const { loading, authorized } = useAuthorization();
  return loading ? (
    <Loading />
  ) : authorized ? (
    <Dashboard />
  ) : (
    <Container>
      <Box className={classes.buttonContainer}>
        <LoginButton />
      </Box>
    </Container>
  );
};

export default Authorization;
