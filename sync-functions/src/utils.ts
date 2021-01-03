import * as admin from "firebase-admin";
import * as path from "path";
import * as os from "os";
import { v4 as uuid } from "uuid";
import * as ffmpeg from "fluent-ffmpeg";
import * as ffmpegPath from "ffmpeg-static";
import { ConfigurationModel, ConversionResult } from "./definitions";
import * as sharp from "sharp";

export const app = admin.initializeApp();
export const firestore = app.firestore();
export const storage = app.storage();
export const bucket = storage.bucket();

export const clientsCollection = firestore.collection("clients");
export const mediaCollection = firestore.collection("media");
export const usersCollection = firestore.collection("users");
export const configurationCollection = firestore.collection("configuration");

const bakaPlanDoc = mediaCollection.doc("bakalari-plan-akci");
const bakaSuplDoc = mediaCollection.doc("bakalari-suplovani");

export const tempFilePath = (name: string) => path.join(os.tmpdir(), name);

export const getConfiguration = async () =>
  (
    await configurationCollection.orderBy("created", "desc").limit(1).get()
  ).docs[0].data() as ConfigurationModel;

export const updateBakaMedia = async (
  suplConversionResult: ConversionResult,
  planConversionResult: ConversionResult
) => {
  await bakaPlanDoc.update({
    source: planConversionResult.name,
    type: planConversionResult.type,
  });
  await bakaSuplDoc.update({
    source: suplConversionResult.name,
    type: suplConversionResult.type,
  });
};

export const uploadFile = (localPath: string) =>
  bucket.upload(localPath, {
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuid(),
      },
    },
  });

export const userExists = async (uid: string) =>
  (await usersCollection.doc(uid).get()).exists;

export const processImage = async (
  fileName: string
): Promise<ConversionResult> => {
  const localFilePath = tempFilePath(fileName);
  await bucket.file(fileName).download({ destination: localFilePath });
  const resizedFileName = `converted_${fileName}`;
  const localResizedImagePath = tempFilePath(resizedFileName);
  const resizedImage = await sharp(localFilePath)
    .resize({
      fit: "contain",
      width: 1080,
    })
    .toFile(localResizedImagePath);
  if (resizedImage.height <= 1920) {
    await uploadFile(localResizedImagePath);
    return { type: "image", name: localResizedImagePath };
  } else {
    return {
      type: "video",
      name: await processVideo(localResizedImagePath, resizedImage.height),
    };
  }
};

const processVideo = (inputPath: string, inputHeight: number) =>
  new Promise<string>((resolve, reject) => {
    const videoOutputFileName = `${uuid()}.mp4`;
    const videoOutputPath = tempFilePath(videoOutputFileName);
    const handleConversionEnd = async () => {
      await bucket.upload(videoOutputPath, {
        metadata: {
          metadata: {
            firebaseStorageDownloadTokens: uuid(),
          },
        },
      });
      resolve(videoOutputFileName);
    };
    ffmpeg()
      .setFfmpegPath(ffmpegPath)
      .input(inputPath)
      .inputOption("-loop 1")
      .videoFilter("crop=1080:1920:0:n")
      .frames(inputHeight - 1920)
      .on("error", reject)
      .on("end", handleConversionEnd)
      .save(videoOutputPath);
  });
