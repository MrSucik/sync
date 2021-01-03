import { firebaseApp } from "../utils/fire";
import firebase from "firebase/app";
import { useClientId } from "./useClientId";
import { useEffect } from "react";

const isOfflineForDatabase = {
  state: "offline",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};
const isOnlineForDatabase = {
  state: "online",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

export const useStatusReporting = () => {
  const clientId = useClientId();
  useEffect(() => {
    const userStatusDatabaseRef = firebaseApp
      .database()
      .ref("/status/" + clientId);
    firebaseApp
      .database()
      .ref(".info/connected")
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          userStatusDatabaseRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => userStatusDatabaseRef.set(isOnlineForDatabase));
        }
      });
  }, [clientId]);
};
