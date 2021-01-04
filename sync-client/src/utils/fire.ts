import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import firebaseConfig from "./firebaseConfig.json";

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const getDownloadURL = (fileName: string) =>
  firebaseApp.storage().ref(fileName).getDownloadURL();
