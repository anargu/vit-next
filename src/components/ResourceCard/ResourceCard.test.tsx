import { SinceDatetimeField, Resource } from "@/src/core/entities";
import { render } from "@testing-library/react";
import { ResourceCard } from "./ResourceCard";

describe("ResourceCard", () => {

  const mockedResource : Resource = new Resource({
    id: "",
    imageSrc: "https://source.unsplash.com/random/50x50",
    imageAlt: "man holding a beer",
    postedAt: new Date(),
    title: "Inter Link",
    description: "This is a link, interlinked",
  });

  it("renders ", async  () => {
    const { container } = render(<ResourceCard hit={mockedResource} />);
    expect(container).toMatchSnapshot();
  });

  it("displays an image", async  () => {
    const { findByAltText } = render(<ResourceCard hit={mockedResource} />);

    const imageElement = await findByAltText(mockedResource.imageAlt);

    expect(imageElement).not.toBeFalsy();
  });

  it("displays title", async () => {

    const { findByText } = render(<ResourceCard hit={mockedResource} />);


    const titleElement = await findByText(mockedResource.title);

    expect(titleElement).not.toBeFalsy();
  });

  describe("field postedAt", () => {

    const patternPostedAt = /\d+\s(m|h|hours?|days?|months?|years?)\sago/;

    it("displays \"now\" when postedAt diff with current time is lower than a minute", async () => {
      const { findByText } = render(<ResourceCard hit={mockedResource} />);

      const postedAtElement = await findByText("now");

      expect(postedAtElement).not.toBeFalsy();
    });

    it("displays created time diff with current time if diff is greater than a minute ", async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      mockedResource.postedAt = yesterday;

      const { findByText } = render(<ResourceCard hit={mockedResource} />);

      const postedAtElement = await findByText(patternPostedAt);

      expect(postedAtElement).not.toBeFalsy();
    });
  });

});
