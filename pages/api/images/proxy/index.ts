import { NextApiRequest, NextApiResponse } from "next";
import fetch from 'isomorphic-unfetch'
import * as fs from "fs"

// TODO: Refactor when proxyImageEndpoint is used.
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const url = decodeURIComponent(req.query.url as string);
    const result = await fetch(url);

    // const body = await result.body;
    const resultBuffer = await result.arrayBuffer()
    res.send(resultBuffer);
  }
};
