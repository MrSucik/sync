import * as functions from "firebase-functions";
import * as path from "path";
import { createClientToken, validateClientId } from "./auth";
import { initialize, getAvailableDates, exportCurrentBakalari } from "./baka";
import { bakaSuplDatesRoute, bakaPlanDatesRoute } from "./constants";
import { firestore, userExists } from "./fire";
import { processMedia } from "./utils";

export const onBakalariConfigurationCreate = functions
  .runWith({ memory: "2GB", timeoutSeconds: 120 })
  .region("europe-west3")
  .firestore.document("configuration/{configurationId}")
  .onCreate(exportCurrentBakalari);

export const onScheduledBakalariScraping = functions
  .region("europe-west3")
  .runWith({ memory: "2GB", timeoutSeconds: 120 })
  .pubsub.schedule("every 30 minutes")
  .onRun(exportCurrentBakalari);

export const onMediaUpdated = functions
  .region("europe-west3")
  .runWith({ memory: "2GB", timeoutSeconds: 300 })
  .firestore.document("media/{mediaId}")
  .onUpdate(async (snapshot) => {
    const oldData = snapshot.before.data();
    const newData = snapshot.after.data();
    const update = snapshot.after.ref.update;
    if (
      !newData.progress &&
      (newData.ready || oldData?.originalSource === newData.originalSource)
    ) {
      return;
    }
    const { name } = path.parse(newData.originalSource);
    const handleProgress = (progress: number) =>
      update({ progress: parseInt(progress.toFixed()) });
    const { source, type, thumbnail } = await processMedia(
      name,
      newData.originalSource,
      handleProgress
    );
    await update({
      source,
      type,
      ready: true,
      thumbnail,
    });
  });

const createAvailableDatesHandler = (url: string) =>
  functions
    .region("europe-west3")
    .runWith({ memory: "1GB" })
    .https.onRequest(async (_request, response) => {
      const page = await initialize();
      await page.goto(url);
      const dates = await getAvailableDates(page);
      response.set("Access-Control-Allow-Origin", "*");
      response.send(dates);
    });

export const availableBakaSuplDates = createAvailableDatesHandler(
  bakaSuplDatesRoute
);

export const availableBakaPlanDates = createAvailableDatesHandler(
  bakaPlanDatesRoute
);

export const isAuthorized = functions
  .region("europe-west3")
  .https.onRequest(async (request, response) => {
    const uid = request.headers["uid"];
    const authorized =
      uid && typeof uid === "string" && (await userExists(uid));
    response.send(authorized);
  });

// Ready stuff beneath

export const onClientStatusChanged = functions
  .region("europe-west3")
  .database.ref("/status/{uid}")
  .onUpdate(async (change, context) => {
    const eventStatus = change.after.val();
    const userStatusFirestoreRef = firestore
      .collection("clients")
      .doc(context.params.uid);
    const statusSnapshot = await change.after.ref.once("value");
    const status = statusSnapshot.val();
    return status.last_changed > eventStatus.last_changed
      ? null
      : userStatusFirestoreRef.update({ status: eventStatus.state });
  });

export const generateClientToken = functions
  .region("europe-west3")
  .https.onRequest(async (request, response) => {
    const clientId = request.query.clientId + "";
    const isValid = await validateClientId(clientId);
    response.set("Access-Control-Allow-Origin", "*");
    if (!isValid) {
      response.status(500).send("Invalid client ID");
    } else {
      const token = await createClientToken(clientId);
      response.send(token);
    }
  });
