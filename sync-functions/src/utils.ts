import * as admin from "firebase-admin";
import { v4 as uuid } from "uuid";
import { ConfigurationModel } from "./models";

const defaultContentType = "image/png";

export const app = admin.initializeApp();
export const firestore = app.firestore();
export const storage = app.storage();

export const clientsCollection = firestore.collection("clients");
export const scenesCollection = firestore.collection("scenes");
export const mediaCollection = firestore.collection("media");
export const usersCollection = firestore.collection("users");
export const configurationCollection = firestore.collection("configuration");

const bakaPlanDoc = mediaCollection.doc("bakalari-plan-akci");
const bakaSuplDoc = mediaCollection.doc("bakalari-suplovani");

export const getConfiguration = async () =>
  (
    await configurationCollection.orderBy("created", "desc").limit(1).get()
  ).docs[0].data() as ConfigurationModel;

export const updateBakaMedia = async (suplUrl: string, planUrl: string) => {
  await bakaPlanDoc.update({ source: planUrl });
  await bakaSuplDoc.update({ source: suplUrl });
};

export const uploadImage = async (destination: string, image: Buffer) => {
  const file = storage.bucket().file(destination);
  const token = uuid();
  await file.save(image, {
    contentType: defaultContentType,
    metadata: { firebaseStorageDownloadTokens: token },
  });
  await file.makePublic();
  return file.publicUrl() + "?alt=media&token=" + token;
};

export const userExists = async (uid: string) =>
  (await usersCollection.doc(uid).get()).exists;
