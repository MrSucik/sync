import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FirebaseReducer, useFirestore } from "react-redux-firebase";
import { RootState } from "../store";
import Dashboard from "../Dashboard/Dashboard";
import Unauthorized from "./Unauthorized";
import Loading from "../components/Loading";

const Authorization = () => {
  const auth = useSelector<RootState, FirebaseReducer.AuthState>(
    (state) => state.firebase.auth
  );
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const firestore = useFirestore();
  useEffect(() => {
    if (!auth.email) {
      return;
    }
    firestore
      .collection("users")
      .get()
      .then((users) =>
        setAuthorized(
          Boolean(users.docs.find((x) => x.id === auth.email)?.exists)
        )
      )
      .finally(() => setLoading(false));
  }, [auth.email, firestore]);
  return loading ? <Loading /> : authorized ? <Dashboard /> : <Unauthorized />;
};
export default Authorization;
