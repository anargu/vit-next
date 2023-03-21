import { fetchURLMetadata } from "./puppeteer.draft"

describe("puppeteer way", () => {
  jest.setTimeout(60000);

  it("retrieves metadata", async () => {
    const url = "https://twitter.com/code/status/1631380145851211780";

    await fetchURLMetadata(url);
  })

});

