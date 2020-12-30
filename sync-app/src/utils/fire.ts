import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance";

const firebaseConfig = {
  apiKey: "AIzaSyABsnWKqt0FKYRwK2iII7B78k2YayeMfOw",
  authDomain: "wigymtv.firebaseapp.com",
  projectId: "wigymtv",
  storageBucket: "wigymtv.appspot.com",
  messagingSenderId: "926443229566",
  appId: "1:926443229566:web:bc981d6024c434a635a32f",
};

export const app = firebase.initializeApp(firebaseConfig);
export const firestore = app.firestore();
export const auth = app.auth();
export const storage = app.storage();
export const performance = app.performance();
