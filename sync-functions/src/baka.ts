import * as puppeteer from "puppeteer";
import * as moment from "moment";
import { tempFilePath } from "./utils";
import { bakaSuplRoute, bakaSuffix, bakaPlanRoute } from "./constants";
import { firestore, getConfiguration } from "./fire";

const removeNewLines = (input: string) => input.replace(/\r?\n|\r/g, "");

const defaultOptions = {
  headless: true,
  args: ["--no-sandbox"],
  defaultViewport: {
    width: 1080,
    height: 100,
    deviceScaleFactor: 2,
  },
};

const takeScreenshot = async (
  page: puppeteer.Page,
  html: string,
  name: string
) => {
  const path = tempFilePath(name);
  await page.setContent(html);
  await page.addStyleTag({
    url:
      "https://firebasestorage.googleapis.com/v0/b/wigymtv.appspot.com/o/supl.css?alt=media&token=79ba43bd-2c8b-42d7-b368-34c2ad688150",
  });
  await page.screenshot({
    fullPage: true,
    path,
  });
  return path;
};

export const initialize = async () => {
  const browser = await puppeteer.launch(defaultOptions);
  const page = await browser.newPage();
  return page;
};

const scrapeSupl = async (page: puppeteer.Page, date: moment.Moment) => {
  await page.goto(bakaSuplRoute + getUrl(moment(date)) + bakaSuffix);
  const html = await page.evaluate(() => {
    let tables = "";
    document.querySelectorAll("table").forEach((table) => {
      tables += table.outerHTML;
    });
    return tables
      ? Promise.resolve(tables)
      : Promise.reject("Cannot find baka supl page!");
  });
  return await takeScreenshot(page, html, "bakalari-suplovani.png");
};

const scrapePlan = async (page: puppeteer.Page, date: moment.Moment) => {
  const nearMonday = moment(date).startOf("isoWeek");
  await page.goto(bakaPlanRoute + getUrl(nearMonday) + bakaSuffix);
  const html = await page.evaluate(() => {
    const table = document.querySelector("table");
    return table
      ? Promise.resolve(table.outerHTML)
      : Promise.reject("Cannot find baka plan page!");
  });
  const EVIL = /<tr>    <td class="td_div_1" width="100%" colspan="4" &nbsp;<="" td="">  <\/td><\/tr>/g;
  const parsedHtml = removeNewLines(html).replace(EVIL, "");
  return await takeScreenshot(page, parsedHtml, "bakalari-plan-akci.png");
};

export const getAvailableDates = async (page: puppeteer.Page) => {
  const dates = await page.evaluate(() => {
    const options = Array.from(document.getElementsByTagName("option"));
    return Promise.resolve(options.map((x) => x.value.substr(2, 6)));
  });
  return dates.map((date) => moment(date, "YYMMDD").format("DD-MM-YYYY"));
};

const getUrl = (date: moment.Moment) => moment(date).format("YYMMDD");

export const exportCurrentBakalari = async () => {
  const configuration = await getConfiguration();
  const planDate = configuration.autoPlanDate
    ? moment()
    : moment(configuration.planDate.toDate()).add(1, "hour");
  const suplDate = configuration.autoSuplDate
    ? moment()
    : moment(configuration.suplDate.toDate()).add(1, "hour");
  const page = await initialize();
  const planResult = await scrapePlan(page, moment(planDate));
  const suplResult = await scrapeSupl(page, moment(suplDate));
  await updateBakaMedia(suplResult, planResult);
};

export const updateBakaMedia = async (
  suplConversionResult: string,
  planConversionResult: string
) => {
  await firestore.doc("media/bakalari-plan-akci").update({
    originalSource: planConversionResult,
    type: "image",
    ready: false,
  });
  await firestore.doc("media/bakalari-suplovani").update({
    originalSource: suplConversionResult,
    type: "image",
    ready: false,
  });
};
