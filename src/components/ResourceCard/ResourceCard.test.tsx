import { VITResource } from "@/src/core/entities";
import { render } from "@testing-library/react";
import { ResourceCard } from "./ResourceCard";

export const patternPostedAt = /\d+\s(m|h|hours?|days?|months?|years?)\sago/;

describe("ResourceCard", () => {

  const mockedResource = () : VITResource => ({
    id: "",
    og_image: "https://source.unsplash.com/random/50x50",
    keyphrase: "man holding a beer",
    date_created: "2022-03-27T16:08:49.507Z",
    og_title: "Inter Link",
    og_description: "This is a link, interlinked",
    url: null,
    url_title: null,
  });

  it("renders the component", async  () => {
    const { container } = render(<ResourceCard hit={mockedResource()} />);
    expect(container).toMatchSnapshot();
  });

  describe("image field", () => {
    it("displays an image", async  () => {
      const { findByAltText } = render(<ResourceCard hit={mockedResource()} />);

      const imageElement = await findByAltText(mockedResource().keyphrase!);

      expect(imageElement.attributes.getNamedItem("src")).not.toBeFalsy();
      expect(imageElement.attributes.getNamedItem("src")?.value).not.toBeFalsy();
      expect(imageElement).not.toBeFalsy();
    });

    it("renders no image if there is not src url", async  () => {
      const data = { ...mockedResource(), og_image: null, keyphrase: null };
      const { container } = render(<ResourceCard hit={data} />);

      const results = container.querySelectorAll("img");

      expect(results.length).toBe(0);
    });
  });

  describe("Title field", () => {

    it("displays title", async () => {

      const { findByText } = render(<ResourceCard hit={mockedResource()} />);

      const titleElement = await findByText(mockedResource().og_title!);

      expect(titleElement).not.toBeFalsy();
    });

    it("displays url_title if title is null", async () => {
      const URL_TITLE = "this is a URL title";
      const hit : VITResource = { ...mockedResource(), og_title: null, url_title: URL_TITLE };

      const { findByText } = render(<ResourceCard hit={hit} />);

      const titleElement = await findByText(URL_TITLE);

      expect(titleElement).not.toBeFalsy();
    });

    it("displays url if title and url_title are null", async () => {
      const URL = "https://www.google.com";
      const hit : VITResource = { ...mockedResource(), og_title: null, url_title: null, url: URL };

      const { findByText } = render(<ResourceCard hit={hit} />);

      const titleElement = await findByText(URL);

      expect(titleElement).not.toBeFalsy();
    });
  });


  describe("field postedAt", () => {

    it("displays \"now\" when postedAt diff with current time is lower than a minute", async () => {
      const hit = mockedResource();
      hit.date_created = new Date().toISOString();

      const { findByText } = render(<ResourceCard hit={hit} />);

      const postedAtElement = await findByText("now");

      expect(postedAtElement).not.toBeFalsy();
    });

    it("displays created time diff with current time if diff is greater than a minute ", async () => {
      const { findByText } = render(<ResourceCard hit={mockedResource()} />);

      const postedAtElement = await findByText(patternPostedAt);

      expect(postedAtElement).not.toBeFalsy();
    });
  });
});
