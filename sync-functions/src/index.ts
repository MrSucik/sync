import * as functions from "firebase-functions";
import * as moment from "moment";
import { initialize, getAvailableDates, scrapePlan, scrapeSupl } from "./baka";
import { bakaSuplDatesRoute, bakaPlanDatesRoute } from "./constants";
import { MediaModel } from "./definitions";
import {
  app,
  firestore,
  getConfiguration,
  processImage,
  updateBakaMedia,
  userExists,
} from "./utils";

export const onScheduledBakalariScraping = functions
  .region("europe-west3")
  .runWith({ memory: "2GB", timeoutSeconds: 120 })
  .pubsub.schedule("every 5 minutes")
  .onRun(async () => {
    const configuration = await getConfiguration();
    const planDate = configuration.autoPlanDate
      ? moment()
      : moment(configuration.planDate.toDate()).add(1, "hour");
    const suplDate = configuration.autoSuplDate
      ? moment()
      : moment(configuration.suplDate.toDate()).add(1, "hour");
    const page = await initialize();
    functions.logger.log(configuration, planDate, suplDate);
    const planResult = await scrapePlan(page, moment(planDate));
    const suplResult = await scrapeSupl(page, moment(suplDate));
    await updateBakaMedia(suplResult, planResult);
  });

export const onClientStatusChanged = functions.database
  .ref("/status/{uid}")
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

export const onMediaCreated = functions
  .runWith({ memory: "2GB", timeoutSeconds: 300 })
  .firestore.document("media/{mediaId}")
  .onCreate(async (snapshot) => {
    const data = snapshot.data() as MediaModel;
    if (data.ready) {
      return;
    }
    const originalSource = data.source;
    const { name: convertedFileName, type } = await processImage(
      originalSource
    );
    await snapshot.ref.update({
      source: convertedFileName,
      type,
      ready: true,
      originalSource,
    });
  });

const createAvailableDatesFunction = (url: string) =>
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

export const availableBakaSuplDates = createAvailableDatesFunction(
  bakaSuplDatesRoute
);

export const availableBakaPlanDates = createAvailableDatesFunction(
  bakaPlanDatesRoute
);

export const isAuthorized = functions
  .region("europe-west3")
  .https.onRequest((request, response) => {
    const uid = request.headers["uid"];
    response.send(uid && typeof uid === "string" && userExists(uid));
  });

export const clientAccess = functions
  .region("europe-west3")
  .https.onRequest(async (request, response) => {
    const clientId = request.query.clientId + "";
    const { exists } = await firestore
      .collection("clients")
      .doc(clientId)
      .get();
    response.set("Access-Control-Allow-Origin", "*");
    if (!exists) {
      response.status(500).send("Invalid client ID");
    } else {
      const token = await app.auth().createCustomToken(clientId);
      response.send(token);
    }
  });
