import { v4 as uuidv4 } from "uuid";
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

export const getDownloadURL = (fileName: string) =>
  storage.ref(`/${fileName}`).getDownloadURL();

export const uploadFile = async (file: File) => {
  const fileName = uuidv4() + file.name;
  const metadata = { contentType: file.type };
  await storage.ref().child(fileName).put(file, metadata);
  return fileName;
};

export const createNewScene = () =>
  firestore.collection("scenes").add({
    name: "New scene",
    mediaList: [],
    created: firebase.firestore.FieldValue.serverTimestamp(),
  });

export const createNewMedia = (
  name: string,
  duration: string,
  remoteFileName: string
) =>
  firestore.collection("media").add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    color: "blue",
    duration,
    name: name || "New Media",
    source: remoteFileName,
    type: "image",
    ready: false,
  });
