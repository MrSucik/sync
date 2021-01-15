import React from "react";
import Button from "../components/Button";
import { useFirebase } from "react-redux-firebase";
import firebase from "firebase/app";

const LoginButton: React.FC = () => {
  const { auth } = useFirebase();
  const handleClick = () =>
    auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      onClick={handleClick}
    >
      Sign in using Google Account
    </Button>
  );
};

export default LoginButton;
