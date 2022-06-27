import { SinceDatetimeField } from "./entities";

describe("SinceDatetimeField", () => {

  it("displays empty string when passed in a empty string", async  () => {
    const input = "";

    const sinceDate = new SinceDatetimeField(input);

    expect(sinceDate.toString()).toBe("");
  });

  it("displays since datetime when passed in a date", async  () => {
    const input = new Date();

    const sinceDate = new SinceDatetimeField(input);

    expect(sinceDate.toString()).toBe("now");
  });
});

