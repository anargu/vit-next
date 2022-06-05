import { act, fireEvent, render } from "@testing-library/react";
import {NavBar} from "./NavBar";

describe("NavBar", () => {

  const FEED_LABEL = "Feed";
  const SAVED_LABEL = "Saved";

  it("should have two items on the left side", () => {
    const { getByText } = render(<NavBar/>);
    
    const feedLabel = getByText(FEED_LABEL);
    const savedLabel = getByText(SAVED_LABEL);

    expect(feedLabel).not.toBeFalsy();
    expect(savedLabel).not.toBeFalsy();
  });

  it("has Feed Item active by default", () => {
    const { getByText } = render(<NavBar/>);

    const feedLabel = getByText(FEED_LABEL);

    expect(feedLabel).toHaveClass("text-black-400");
  });

  it("set active when clicked on inactive item", async () => {
    const { getByText } = render(<NavBar/>);

    const savedLabel = getByText(SAVED_LABEL);

    act(() => { fireEvent.click(savedLabel); });

    expect(savedLabel.className).toContain("text-black");


    const feedLabel = getByText(FEED_LABEL);

    act(() => { fireEvent.click(feedLabel); });

    expect(feedLabel.className).toContain("text-black");
  });
});
