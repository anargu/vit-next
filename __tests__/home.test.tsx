import { InMemoryRepository } from "../src/core/InMemoryRepository";
import { executeSearch } from "../src/components/SearchBar";

describe("Home", () => {
  describe("Search fn is used", () => {

    it("should retrieve all content when input string is empty", async () => {
      const repository = new InMemoryRepository();
      repository.data = [{id: "1"}, {id: "2"}];

      const searchTerm = "";
      const result = await executeSearch(repository, searchTerm);

      expect(result).toStrictEqual(repository.data);
    });

    it("should retrieve filtered content when input has a value", () => {

    });

  });

})
