import { v4 as uuidv4 } from "uuid";
import { storage } from "../utils/fire";

const getFileExtension = (input: string) =>
  // @ts-ignore
  "." + /(?:\.([^.]+))?$/.exec(input)[1];

export const uploadFile = (file: File, onSnapshot: () => void = () => {}) => {
  const metadata = {
    contentType: file.type,
  };
  const upload = storage
    .ref()
    .child(uuidv4() + getFileExtension(file.name))
    .put(file, metadata);
  return new Promise((resolve, reject) =>
    upload.on(
      "state_changed",
      onSnapshot,
      (error) => reject(error),
      async () => {
        const downloadURL = await upload.snapshot.ref.getDownloadURL();
        resolve(downloadURL);
      }
    )
  );
};
