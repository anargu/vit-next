import { render } from '@testing-library/react'
import { IndexPage } from "../pages/index";
import { mockMeiliSearchComponent } from '../components/MeiliSearch.mocks';
import { useLinks } from '../hooks/useLinks';
import { mockedVITResource } from '../../__tests__/utils';
import { Resource } from '../core/entities';

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: () => {
    return {
      push: () => {},
      pathname: "/",
    };
  },
}));

jest.mock("../components/MeiliSearch", () => ({
  __esModule: true,
  MeiliSearchBar: () => mockMeiliSearchComponent.MeiliSearchBar,
}));

jest.mock("../hooks/useLinks", () => ({
  useLinks: jest.fn(),
}));

const IndexTitle = `VIT, a curated feed of tons of interesting articles, news, tutorials... things.`;

describe("Home", () => {

  describe("Body", () => {
    it("should have a title", () => {
      (useLinks as jest.Mock).mockReturnValue({
        feedLinks: [],
        initListeningFeed: () => (() => {}),
      })

      const { getByText } = render(<IndexPage/>);

      const matchedEl = getByText(IndexTitle);

      expect(matchedEl).toBeTruthy();
    });

    // TODO: Consider add search bar and test
    /* it("should have a search bar", () => { */
    /*   const { container } = render(<IndexPage/>); */
    /**/
    /*   const matchedEl = container.querySelector("input"); */
    /**/
    /*   expect(matchedEl).toBeTruthy(); */
    /* }); */

    it("appears two cards of results below the search bar", () => {
      const twoPosts = [mockedVITResource(), mockedVITResource()].map(Resource.fromVITResource);

      (useLinks as jest.Mock).mockReturnValue({
        feedLinks: twoPosts,
        initListeningFeed: () => (() => {}),
      })

      const { getByText } = render(<IndexPage/>);

      twoPosts.forEach((post) => {
        getByText(post.title!)
      });
    });


    // it("hides title when scrolls down", () => {
    //   const { container, getByText } = render(<IndexPage/>);
    //
    //   expect(container.firstElementChild).toBeInTheDocument();
    //
    //   fireEvent.scroll(container.firstElementChild!, { target: { scrollY: 100 } });
    //
    //   const titleEl = getByText(IndexTitle);
    //   expect(titleEl).toHaveClass("hidden");
    // });

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
