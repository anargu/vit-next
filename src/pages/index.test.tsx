import { fireEvent, render, screen } from '@testing-library/react'
import { InMemoryRepository } from "../core/InMemoryRepository";
import { executeSearch } from "../components/SearchBar";
import { IndexPage } from "../pages/index";

jest.mock('next/link', () => ({ children } : any) => children);

describe("Home", () => {

  describe("Body", () => {
    it("should have a title", () => {
      const { getByText } = render(<IndexPage/>);

      const matchedEl = getByText(`VIT, a curated feed of tons of interesting articles, news, tutorials... things.`);

      expect(matchedEl).toBeTruthy();
    });

    it("should have a search bar", () => {
      const { container } = render(<IndexPage/>);

      const matchedEl = container.querySelector("input");

      expect(matchedEl).toBeTruthy();
    });
  });

  // describe("Search fn is used", () => {
  //
  //   it("should retrieve all content when input string is empty", async () => {
  //     const repository = new InMemoryRepository();
  //     repository.data = [{id: "1"}, {id: "2"}];
  //
  //     const searchTerm = "";
  //     const result = await executeSearch(repository, searchTerm);
  //
  //     expect(result).toStrictEqual(repository.data);
  //   });
  //
  //   it("should retrieve filtered content when input has a value", () => {
  //
  //   });
  // });

})
