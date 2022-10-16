import { NextApiRequest, NextApiResponse } from "next";

import metascraper from 'metascraper';

import metascraperUrl from 'metascraper-url';
import metascraperTitle from 'metascraper-title';
import metascraperImage from 'metascraper-image';
import metascraperDate from 'metascraper-date';
import metascraperDescription from 'metascraper-description';
import metascraperPublisher from 'metascraper-publisher';
import { APIResponse } from "../entities";

export type MetadataResponse = {
  url: string,
};

export interface MetascrapperResponse extends MetadataResponse {
  title?: string,
  author?: string,
  date?: string,
  description?:string,
  image?: string,
  logo?: string,
  publisher?: string,
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const url = decodeURIComponent(req.query.url as string);

      const response = await fetch(url);

      const html = await response.text();
      const _url = response.url;

      const metadata = await metascraper([
        metascraperUrl(),
        metascraperTitle(),
        metascraperImage(),
        metascraperDate(),
        metascraperDescription(),
        metascraperPublisher(),
      ])({ html, url: _url }) as MetascrapperResponse;

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
