import firebase from "firebase/firestore";

export type Timestamp = firebase.firestore.Timestamp;

interface FirestoreDocument {
  id: string;
}

export interface MediaModel extends FirestoreDocument {
  created: Timestamp;
  ready: boolean;
  name: string;
  duration: number;
  source: string;
  type: string;
  color: string;
  configurable?: boolean;
}

export interface ClientModel extends FirestoreDocument {
  name: string;
  scene: string;
  icon: string;
  status: "online" | "offline";
}

export interface SceneModel extends FirestoreDocument {
  name: string;
  mediaList: string[];
}

export interface Scene extends FirestoreDocument {
  name: string;
  mediaList: MediaModel[];
  clientsList: ClientModel[];
}

export interface ConfigurationModel extends FirestoreDocument {
  created: Timestamp;
  autoSuplDate: boolean;
  autoPlanDate: boolean;
  planDate: Timestamp;
  suplDate: Timestamp;
}
