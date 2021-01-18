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

export const getDownloadURL = (path: string) =>
  storage.ref(path).getDownloadURL();

export const uploadFile = async (file: File) => {
  const path = `uploads/${file.name}`;
  await storage.ref().child(path).put(file);
  return path;
};

export const createNewScene = () =>
  firestore.collection("scenes").add({
    name: "New scene",
    mediaList: [],
    created: firebase.firestore.FieldValue.serverTimestamp(),
  });

const randomColor = () => "#" + (((1 << 24) * Math.random()) | 0).toString(16);

export const createNewMedia = (
  name: string,
  duration: string,
  source: string
) =>
  firestore.collection("media").add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    color: randomColor(),
    duration,
    name: name || "New Media",
    originalSource: source,
    // TODO: create mapping logic
    type: source.endsWith("mp4") ? "video" : "image",
    ready: false,
  });
