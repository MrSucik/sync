import React from "react";
import { makeStyles } from "@material-ui/core";
import Button from "../components/Button";
import { useFirebase } from "react-redux-firebase";
import firebase from "firebase/app";
import Container from "./Container";

const useStyles = makeStyles(() => ({
  button: {
    color: "white",
    transform: "translate(516px, 295px)",
  },
}));

const Authentication: React.FC = () => {
  const classes = useStyles();
  const { auth } = useFirebase();
  const handleClick = () => {
    auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };
  return (
    <Container title="Sign in" backgroundImage="./backgrounds/login.png">
      <Button
        className={classes.button}
        variant="text"
        color="inherit"
        onClick={handleClick}
      >
        Sign in using Google Account
      </Button>
    </Container>
  );
};

export default Authentication;
