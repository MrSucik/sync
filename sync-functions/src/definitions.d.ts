import { firestore } from "firebase-admin";

interface ClientModel {
  name: string;
  scene: string;
  icon: string;
}

interface SceneModel {
  name: string;
  media: string[];
}

interface MediaModel {
  created: firestore.Timestamp;
  name: string;
  duration: number;
  source: string;
  type: string;
  color: string;
  ready: boolean;
  configurable?: boolean;
}

export interface ConfigurationModel {
  created: Date;
  autoSuplDate: boolean;
  autoPlanDate: boolean;
  planDate: firestore.Timestamp;
  suplDate: firestore.Timestamp;
}

export interface ConversionResult {
  name: string;
  type: "image" | "video";
}
