import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useFirebase } from "react-redux-firebase";
import Button from "../components/Button";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    backgroundColor: "#fff",
    color: theme.palette.primary.main,
  },
}));

const LogoutButton = () => {
  const classes = useStyles();
  const firebase = useFirebase();
  const handleClick = async () => {
    const auth = firebase.auth();
    await auth.signOut();
  };
  return (
    <Button
      variant="contained"
      className={classes.button}
      onClick={handleClick}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
