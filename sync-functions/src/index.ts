import * as functions from "firebase-functions";
import * as moment from "moment";
import { initialize, getAvailableDates, scrapePlan, scrapeSupl } from "./baka";
import { bakaSuplDatesRoute, bakaPlanDatesRoute } from "./constants";
import { getConfiguration, updateBakaMedia, userExists } from "./utils";

export const scheduledBakaScraping = functions
  .region("europe-west3")
  .runWith({ memory: "2GB" })
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
    const planUrl = await scrapePlan(page, moment(planDate));
    const suplUrl = await scrapeSupl(page, moment(suplDate));
    await updateBakaMedia(suplUrl, planUrl);
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
