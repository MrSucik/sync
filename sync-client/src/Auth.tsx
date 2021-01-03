import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FirebaseReducer } from "react-redux-firebase";
import { RootState } from "./store/store";
import App from "./App";
import axios from "axios";
import { firebaseApp } from "./utils/fire";
import { useClientId } from "./hooks/useClientId";

const Auth = () => {
  const clientId = useClientId();
  useEffect(() => {
    const updateToken = async () => {
      await firebaseApp.auth().signOut();
      const { data } = await axios.get<string>(
        `https://europe-west3-wigymtv.cloudfunctions.net/clientAccess?clientId=${clientId}`
      );
      await firebaseApp.auth().signInWithCustomToken(data);
    };
    updateToken();
  }, [clientId]);
  const auth = useSelector<RootState, FirebaseReducer.AuthState>(
    (state) => state.firebase.auth
  );
  return auth.isEmpty ? null : <App />;
};

export default Auth;
