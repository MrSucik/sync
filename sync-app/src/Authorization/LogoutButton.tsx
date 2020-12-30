import React from "react";
import { useFirebase } from "react-redux-firebase";
import Button from "../components/Button";

const LogoutButton = () => {
  const firebase = useFirebase();
  const handleClick = async () => {
    const auth = firebase.auth();
    await auth.signOut();
  };
  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Logout
    </Button>
  );
};

export default LogoutButton;
