import { app, firestore } from "./fire";

export const createClientToken = (clientId: string) =>
  app.auth().createCustomToken(clientId);

export const validateClientId = async (clientId: string) => {
  const { exists } = await firestore.collection("clients").doc(clientId).get();
  if (!exists) {
    return false;
  }
  return true;
};
