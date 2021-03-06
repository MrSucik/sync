import firebase from "firebase/app";
import { useEffect } from "react";
import { useFirebase } from "react-redux-firebase";

const isOfflineForDatabase = {
  state: "offline",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};
const isOnlineForDatabase = {
  state: "online",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

export const useStatusReporting = (clientId: string) => {
  const { database } = useFirebase();
  useEffect(() => {
    const userStatusDatabaseRef = database().ref("/status/" + clientId);
    database()
      .ref(".info/connected")
      .on("value", async (snapshot) => {
        if (snapshot.val()) {
          await userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase);
          userStatusDatabaseRef.set(isOnlineForDatabase);
        }
      });
  }, [clientId, database]);
};
