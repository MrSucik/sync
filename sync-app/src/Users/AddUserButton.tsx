import {
  Box,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import firebase from "firebase/app";
import { useSnackbar } from "notistack";
import Action from "../components/Action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: "white",
    },
    emailField: {
      flex: 1,
      marginRight: theme.spacing(2),
      color: "white",
      "& input": {
        color: "white",
        paddingLeft: theme.spacing(1),
      },
      "& input::placeholder": {
        color: "white",
      },
      "& .MuiInput-underline:before": {
        borderBottomColor: "#fff8",
      },
      "& .MuiInput-underline:hover:before": {
        borderBottomColor: "#fff",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#fff",
      },
    },
    container: {
      display: "flex",
      alignItems: "flex-end",
      margin: theme.spacing(0, 1),
      paddingRight: 8,
    },
  })
);

const AddUserButton = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const firestore = useFirestore();
  const { enqueueSnackbar } = useSnackbar();
  const handleClick = async () => {
    try {
      await firestore.add(
        { collection: "users", doc: email },
        { created: firebase.firestore.FieldValue.serverTimestamp() }
      );
      enqueueSnackbar(
        `User ${email} successfully added to the administration.`,
        { variant: "success" }
      );
    } catch {
      enqueueSnackbar(
        "Failed to add this user to the application administration!",
        { variant: "error" }
      );
    }
  };
  return (
    <Box className={classes.container}>
      <TextField
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className={classes.emailField}
        placeholder="Type an email address"
      />
      <Action
        icon="add"
        onClick={handleClick}
        tooltip="Click to add this user to the application administration"
        iconButtonProps={{ size: "small", style: { color: "white" } }}
      />
    </Box>
  );
};
export default AddUserButton;
