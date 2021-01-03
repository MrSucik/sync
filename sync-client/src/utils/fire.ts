import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import firebaseConfig from "./firebaseConfig.json";

export const firebaseApp = firebase.initializeApp(firebaseConfig);
