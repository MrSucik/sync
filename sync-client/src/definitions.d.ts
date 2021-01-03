import firebase from "firebase";

export interface SceneModel {
  name: string;
  mediaList: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>[];
}

export interface ClientModel {
  name: string;
  scene: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
}

export interface MediaModel {
  id: string;
  name: string;
  source: string;
  duration: number;
  type: "video" | "image";
}
