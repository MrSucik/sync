import React from "react";
import { useSelector } from "react-redux";
import { Box, makeStyles } from "@material-ui/core";
import { RootState } from "./store";
import Authentication from "./Authorization/Authentication";
import { FirebaseReducer } from "react-redux-firebase";
import Authorization from "./Authorization/Authorization";
import Loading from "./components/Loading";

const useStyles = makeStyles(() => ({
  container: {
    background:
      "linear-gradient(rgba(255, 255, 255, 0.97), rgba(255, 255, 255, 0.97)), url('./backgrounds/cosmic_cats.png')",
    minHeight: "100vh",
    position: "relative",
  },
}));

const App = () => {
  const classes = useStyles();
  const auth = useSelector<RootState, FirebaseReducer.AuthState>(
    (state) => state.firebase.auth
  );
  return (
    <Box className={classes.container}>
      {!auth.isLoaded ? (
        <Loading />
      ) : !auth.isEmpty ? (
        <Authorization />
      ) : (
        <Authentication />
      )}
    </Box>
  );
};

export default App;
