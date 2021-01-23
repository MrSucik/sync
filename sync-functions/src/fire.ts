import * as admin from "firebase-admin";
import { ConfigurationModel } from "./definitions";
import { v4 as uuid } from "uuid";

export const app = admin.initializeApp();
export const firestore = app.firestore();
export const storage = app.storage();
export const bucket = storage.bucket();

export const getConfiguration = async () =>
  (
    await firestore
      .collection("configuration")
      .orderBy("created", "desc")
      .limit(1)
      .get()
  ).docs[0].data() as ConfigurationModel;

export const uploadFile = (localPath: string, remotePath: string = localPath) =>
  bucket.upload(localPath, {
    destination: remotePath,
    metadata: { metadata: { firebaseStorageDownloadTokens: uuid() } },
  });

export const userExists = async (uid: string) =>
  (await firestore.collection("users").doc(uid).get()).exists;
