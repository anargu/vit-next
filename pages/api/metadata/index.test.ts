import { getTweetId } from ".";

export {}

describe("Metadata index", () => {

  it("url comes from different post", () => {
    /* random url */
    const url = "https://google.com/search?query=23232&status=true";

    const haveTwitterDomain = url.includes("https://twitter.com/");
    const haveStatusPath = url.includes("/status/");

    expect(haveTwitterDomain).toBe(false);
    expect(haveStatusPath).toBe(false);
  });

  it("url comes from twitter post", () => {

    /* random url */
    const url = "https://twitter.com/JCFights/status/1634993370631385088";

    const haveTwitterDomain = url.includes("https://twitter.com/");
    const haveStatusPath = url.includes("/status/");

    expect(haveTwitterDomain).toBe(true);
    expect(haveStatusPath).toBe(true);
  });

  describe("getTweetId", () => {

    it("returns status ID of a URL tweet", () => {
      const url = "https://twitter.com/LinusEkenstam/status/1635754587775967233";

      const statusID = getTweetId(url);

      expect(statusID).toBe("1635754587775967233");
    });

    it("returns status ID of a URL tweet with more params after status ID", () => {
      const url = "https://twitter.com/LinusEkenstam/status/1635754587775967233/34234";

      const statusID = getTweetId(url);

      expect(statusID).toBe("1635754587775967233");

      const url2 = "https://twitter.com/LinusEkenstam/status/1635754587775967233/?abc=2342342343";

      const statusID2 = getTweetId(url2);

      expect(statusID2).toBe("1635754587775967233");
    });

    it("returns undefined when is not URL tweet", () => {
      const url = "https://twitter.com/perelf";

      const statusID = getTweetId(url);

      expect(statusID).toBeUndefined();
    });
  });
});
