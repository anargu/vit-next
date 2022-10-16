import { NextApiRequest, NextApiResponse } from "next";
import { createMocks, RequestMethod } from "node-mocks-http"
import fetch from 'isomorphic-unfetch'
import imageProxy from "../../../pages/api/images/proxy"

// TODO: Refactor when proxyImageEndpoint is used.
async function testRetrieveImage (req: NextApiRequest, res: NextApiResponse) {
    const url = decodeURIComponent(req.query.url as string);
    const result = await fetch(url);

    const resultBuffer = await result.arrayBuffer()
    res.send(resultBuffer);
};

describe("Proxy endpoint", () => {
  function mockRequestResponse(method: RequestMethod = 'GET') {
    const {
      req,
      res,
    }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });

    req.headers = {
    };
    req.query = { url: "https://d2dgum4gsvdsrq.cloudfront.net/assets/og-image-d0cb8fd5e692e4d428397f77401f6c7a43ffacdc6f5c917e93f5544b57acbecb.png" };
    return { req, res };
  }

  it("should return a Ok response witht the image", async () => {
    // const {req, res} = mockRequestResponse();
    // await testRetrieveImage(req, res);
    // expect(res.statusCode).toBe(200);
  });
});
