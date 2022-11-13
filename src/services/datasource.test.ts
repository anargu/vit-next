import { mockedResource } from "../../__tests__/utils";
import { SAVED_LINK_KEY } from "../components/ResourceCard/ResourceCard";
import { AuthenticatedUser } from "./auth";
const { migrateLocalData } = jest.requireActual("./datasource");

jest.mock("../firebase", () => ({
  firestore: {},
}));

jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
}));

describe("Datasource", () => {

  describe("User Data Migration", () => {
    const user_ : AuthenticatedUser = {
      id: "1",
      email: "abc@gmail.com",
      displayName: "abc",
    };

    it("does nothing if there is no local data to migrate", async () => {
      localStorage.setItem(SAVED_LINK_KEY, "[]");

      const result =  await migrateLocalData(user_);

      expect(result).toBeNull();
    });

    it("cleans local data if data migration succeeds", async () => {
      const oldPostOne = mockedResource();
      const oldPostTwo = mockedResource();

      localStorage.setItem(SAVED_LINK_KEY,
        JSON.stringify([oldPostOne, oldPostTwo])
      );

      await migrateLocalData(user_);

      expect(localStorage.getItem(SAVED_LINK_KEY)).toBeNull();
    });
  });
});
