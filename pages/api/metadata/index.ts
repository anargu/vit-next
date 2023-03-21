import { NextApiRequest, NextApiResponse } from "next";

import metascraper from 'metascraper';

import { APIResponse } from "../entities";
import metascraperUrl from 'metascraper-url';
import { MetadataResponse } from "./entities";
import metascraperDate from 'metascraper-date';
import metascraperImage from 'metascraper-image';
import metascraperTitle from 'metascraper-title';
import { fetchURLMetadata } from "./puppeteer.draft";
import metascraperPublisher from 'metascraper-publisher';
import metascraperDescription from 'metascraper-description';

function isUrlTweet (url : string) : boolean {
  const haveTwitterDomain = url.includes("https://twitter.com/");
  const haveStatusPath = url.includes("/status/");

  return haveTwitterDomain && haveStatusPath;
}

export function getTweetId(url : string) : string | undefined {
  const path = new URL(url).pathname;

  const id = path.match(/\/status\/(\d+)/i)?.[1];

  return id;
}

async function scrappingWithTwitterProvider (url : string) : Promise<MetadataResponse> {
  const tweetId = getTweetId(url);

  const requestApiUrl = `${process.env.VIT_API_URL}/api/v0/scrape/tweet?tweet_id=${tweetId}`;

  const response = await fetch(requestApiUrl);
  
  const body : MetadataResponse = await response.json();

  return body;
}

async function scrappingWithMetascraper (url : string) {
  const response = await fetch(url);

  const html = await response.text();
  const _url = response.url;


  let metadata = await metascraper([
    metascraperUrl(),
    metascraperTitle(),
    metascraperImage(),
    metascraperDate(),
    metascraperDescription(),
    metascraperPublisher(),
  ])({ html, url: _url }) as MetadataResponse;

  return metadata;
}

async function metadataFetchStrategy (url : string) {
  /* Check if is a tweet url */
  debugger;

  const isTweet = isUrlTweet(url);

  if (isTweet) return await scrappingWithTwitterProvider(url);
   
  /* Otherwise use metascraper */
  let metadata = await scrappingWithMetascraper(url);

  /* if has got insufficient data, then fetch from puppeteer */
  if (metadata.title === "Just a moment..." || metadata.title === null) {
    const metadata_ = await fetchURLMetadata(url);

    if (metadata_ !== null) {
      metadata = { ...metadata, ...metadata_, };
    }
  }

  return metadata;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const url = decodeURIComponent(req.query.url as string);

      let metadata : MetadataResponse;

      metadata = await metadataFetchStrategy(url);

      res.send({ isOk: true, data: metadata } as APIResponse);

      return;
    } catch (e : any) {
      res.status(400).send({
        isOk: false,
        error: e.toString?.(),
      } as APIResponse);
    }
  }
};
