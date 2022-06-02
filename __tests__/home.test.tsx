import { render, screen } from '@testing-library/react'
import { InMemoryRepository } from "../src/core/InMemoryRepository";
import { executeSearch } from "../src/components/SearchBar";
import { IndexPage } from "../src/pages/index";

describe("Home", () => {
  describe("Body", () => {

    it("should have a title", () => {
      const { getByText } = render(<IndexPage/>);

      const matchedEl = getByText(`VIT, a curated feed of tons of interesting articles, news, tutorial... things.`);

      expect(matchedEl).toBeTruthy();
    });

    it("should have search bar", () => {
      const { container } = render(<IndexPage/>);

      const matchedEl = container.querySelector("input");

      expect(matchedEl).toBeTruthy();
    });
  });

  describe("Search bar", () => {
    it("should go to another page to resume the search when submitting a search", () => {

    });
  });

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
