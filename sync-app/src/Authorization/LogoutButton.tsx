import React from "react";
import { useFirebase } from "react-redux-firebase";
import Action from "../components/Action";

const LogoutButton = () => {
  const firebase = useFirebase();
  const handleClick = async () => {
    const auth = firebase.auth();
    await auth.signOut();
  };
  return (
    <Action
      tooltip="Sign out"
      icon="exit_to_app"
      onClick={handleClick}
      iconProps={{ style: { color: "white" } }}
    />
  );
};

export default LogoutButton;
