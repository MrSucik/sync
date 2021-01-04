import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FirebaseReducer } from "react-redux-firebase";
import { RootState } from "./store/store";
import App from "./App";
import { firebaseApp } from "./utils/fire";
import { useClientId } from "./hooks/useClientId";
import client from "./utils/client";

const Auth = () => {
  const clientId = useClientId();
  useEffect(() => {
    const updateToken = async () => {
      await firebaseApp.auth().signOut();
      const { data } = await client.clientAccess(clientId);
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
