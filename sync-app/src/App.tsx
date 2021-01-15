import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Authorization from "./Authorization/Authorization";
import { FirebaseReducer } from "react-redux-firebase";
import Loading from "./components/Loading";

const App = () => {
  const { isLoaded } = useSelector<RootState, FirebaseReducer.AuthState>(
    (state) => state.firebase.auth
  );
  return !isLoaded ? <Loading /> : <Authorization />;
};

export default App;
