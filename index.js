//"https://www.ios-resolution.com/";

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

const sample = [
  {
    Model: "",
    LogicalWidth: 0,
    LogicalHeight: 0,
    PhysicalWidth: 0,
    PhysicalHeight: 0,
    PPI: 0,
    ScaleFactor: 0,
    ScreenDiagonal: 0.0,
    Release: "",
  },
];

let browser;

async function scrape(url) {
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const html = await page.evaluate(() => document.body.innerHTML);
    const $ = await cheerio.load(html);

    const data = $("body > article > table > tbody > tr")
      .map((index, element) => {
        console.log($(element).text());
        const Model = $(element).find("td:nth-child(1) a").text();
        const LogicalWidth = $(element)
          .find("td:nth-child(2)")
          .text()
          .split(":")[1];
        const LogicalHeight = $(element)
          .find("td:nth-child(3)")
          .text()
          .split(":")[1];
        const PhysicalWidth = $(element)
          .find("td:nth-child(4)")
          .text()
          .split(":")[1];
        const PhysicalHeight = $(element)
          .find("td:nth-child(5)")
          .text()
          .split(":")[1];
        const PPI = $(element).find("td:nth-child(6)").text().split(":")[1];
        const ScaleFactor = $(element)
          .find("td:nth-child(7)")
          .text()
          .split(":")[1];
        const ScreenDiagonal = $(element)
          .find("td:nth-child(8)")
          .text()
          .split(":")[1];
        const Release = $(element).find("td:nth-child(9)").text().split(":")[1];
        return {
          Model,
          LogicalWidth,
          LogicalHeight,
          PhysicalWidth,
          PhysicalHeight,
          PPI,
          ScaleFactor,
          ScreenDiagonal,
          Release,
        };
      })
      .get();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  browser = await puppeteer.launch({ headless: false });
  let result = await scrape("https://www.ios-resolution.com/");
  for (data of result) {
    data["LogicalWidth"] = parseInt(data["LogicalWidth"]);
    data["logicalHeight"] = parseInt(data["LogicalHeight"]);
    data["PhysicalWidth"] = parseInt(data["PhysicalWidth"]);
    data["PhysicalHeight"] = parseInt(data["PhysicalHeight"]);
    data["PPI"] = parseInt(data["PPI"]);
    data["ScaleFactor"] = parseInt(data["ScaleFactor"]);
    data["ScreenDiagonal"] = parseFloat(
      data["ScreenDiagonal"].replace('"', "")
    );
  }
  fs.writeFileSync("result.json", JSON.stringify(result));
}

main();
