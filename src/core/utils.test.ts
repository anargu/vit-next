import { AutoId } from "./utils";

describe("Auto id generation", () => {

  it("generated an string id", () => {
    const id = AutoId.newId();

    expect(id).not.toBeFalsy();
    expect(id).not.toBeNull();
    expect(id).not.toHaveLength(0);
    expect(typeof id).toBe("string");
  });
});
