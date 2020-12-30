import firebase from "firebase";
import firebaseConfig from "./firebaseConfig.json";

const clientId = "jy6H8ycpEtM5g9UNutXI";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();

const clientsCollection = firestore.collection("clients");

const clientDoc = clientsCollection.doc(clientId);

firebaseApp.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

export { firebaseApp, firestore, clientDoc };
