import jsdom from "jsdom"
import puppeteer from "puppeteer"
import { MetadataResponse } from "./entities";

const puppeteerConfig = JSON.parse(process.env.NEXT_PUBLIC_PUPPETEER_PARAMS ?? "");

export const fetchURLMetadata = async (url : string) : Promise<MetadataResponse | null> => {
  try {
    console.log(`>>> url: ${url}`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.evaluateOnNewDocument(() => {
      Object.keys(puppeteerConfig?.navigator.items).map((navigatorKey) => {
        const navigatorValue = puppeteerConfig?.navigator?.items[navigatorKey];

        Object.defineProperty(navigator, "navigatorKey", { get: () => navigatorValue });
      });
    });

    if (!!puppeteerConfig?.ua) {
      await page.setUserAgent(puppeteerConfig.ua);
    }

    const response = await page.goto(url);
    const body = await response?.text();

    const { window: { document } } = new jsdom.JSDOM(body);

    const title = document.title
    const description = document.querySelector("meta[name='description']")?.getAttribute("content");
    const keywords = document.querySelector("meta[name='keywords']")?.getAttribute("content");

    const og_title = document.querySelector("meta[property='og:title']")?.getAttribute("content");
    const og_description = document.querySelector("meta[property='og:description']")?.getAttribute("content");
    const og_image = document.querySelector("meta[property='og:image']")?.getAttribute("content");
    const og_author = document.querySelector("meta[property='og:author']")?.getAttribute("content");
    // TODO: Implement
    /* const og_type = document.querySelector("meta[property='og:type']")?.getAttribute("content"); */
    /* const og_url = document.querySelector("meta[property='og:url']")?.getAttribute("content"); */

    const metadataFromURL : MetadataResponse = {
      title: og_title ?? title,
      image: og_image ?? undefined,
      description: og_description ?? description ?? undefined,
      author: og_author ?? undefined,
      keywords: keywords ?? undefined,
    };

    await browser.close();

    return metadataFromURL;
  } catch (error) {
    console.error(error);

    return null;
  }
};


