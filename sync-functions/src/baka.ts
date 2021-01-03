import * as puppeteer from "puppeteer";
import * as moment from "moment";
import { processImage, tempFilePath } from "./utils";
import { bakaSuplRoute, bakaSuffix, bakaPlanRoute } from "./constants";

const removeNewLines = (input: string) => input.replace(/\r?\n|\r/g, "");
const croppingLimit = 2048;

const defaultOptions = {
  headless: true,
  args: ["--no-sandbox"],
  defaultViewport: {
    width: croppingLimit / 2,
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

export const scrapeSupl = async (page: puppeteer.Page, date: moment.Moment) => {
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
  const name = "bakalari-suplovani.png";
  const localPath = await takeScreenshot(page, html, name);
  return await processImage(localPath);
};

export const scrapePlan = async (page: puppeteer.Page, date: moment.Moment) => {
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
  const name = "bakalari-plan-akci.png";
  const localPath = await takeScreenshot(page, parsedHtml, name);
  return await processImage(localPath);
};

export const getAvailableDates = async (page: puppeteer.Page) => {
  const dates = await page.evaluate(() => {
    const options = Array.from(document.getElementsByTagName("option"));
    return Promise.resolve(options.map((x) => x.value.substr(2, 6)));
  });
  return dates.map((date) => moment(date, "YYMMDD").format("YYYY-MM-DD"));
};

const getUrl = (date: moment.Moment) => moment(date).format("YYMMDD");
