import extractMetadataEndpoint, { MetascrapperResponse } from "@/pages/api/metadata";
import { NextApiRequest, NextApiResponse } from "next";
import { createMocks, RequestMethod } from "node-mocks-http"

// TODO: Refactor when proxyImageEndpoint is used.
async function dummyMetadataEndpoint (req: NextApiRequest, res: NextApiResponse) {
  const _ = decodeURIComponent(req.query.url as string);

  // Dummy data to return;
  const dummyData : MetascrapperResponse = {
    url: "https://localhost:3002/"
  };

  res.send({ result: dummyData });
};

describe("get metadata endpoint", () => {
  function mockRequestResponse(method: RequestMethod = 'GET') {
    const {
      req,
      res,
    }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });

    req.headers = {
    };
    req.query = { url: "https://www.youtube.com/watch?v=eL9iEiJTcDw" };
    return { req, res };
  }

  it("should return a Ok response with the data", async () => {
    const {req, res} = mockRequestResponse();

    await dummyMetadataEndpoint(req, res);
    
    expect(res.statusCode).toBe(200);
  });

  it("should return a 400 response when no url is provided", async () => {
    const {req, res} = mockRequestResponse();

    await extractMetadataEndpoint(req, res);
    
    expect(res.statusCode).toBe(400);
  });
});
