import { render } from "@testing-library/react";
import { mockedResource } from "../../__tests__/utils";
import { SAVED_LINK_KEY } from "../components/ResourceCard/ResourceCard";
import { SavedPage } from "./saved";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: () => {
    return {
      push: () => {},
      pathname: "/",
    };
  },
}));

describe("Saved", () => {
  it("should render empty posts if there are no saved posts", async () => {
    const { findByText } = render(<SavedPage />);

    await findByText("Saved");

    await findByText("No Saved Posts. Save new ones on Feed section.")
  });

  it("should list all saved posts", async () => {
    const oldPostOne = mockedResource();
    const oldPostTwo = mockedResource();

    localStorage.setItem(SAVED_LINK_KEY, JSON.stringify([oldPostOne, oldPostTwo]));

    const { findByText, queryByText } = render(<SavedPage />);

    expect(queryByText("No Saved Posts. Save new ones on Feed section.")).toBeNull();

    await findByText(oldPostOne.og_title!);
    await findByText(oldPostTwo.og_title!);
  });

});

