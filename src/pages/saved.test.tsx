import { userEvent } from "@storybook/testing-library";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { mockedResource } from "../../__tests__/utils";
import { SAVED_LINK_KEY } from "../components/ResourceCard/ResourceCard";
import { useLinks } from "../hooks/useLinks";
import { unsaveLink } from "../services/datasource";
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

jest.mock("../hooks/useLinks", () => ({
  useLinks: jest.fn(),
}));

describe("Saved", () => {
  it("should render empty posts if there are no saved posts", async () => {
    (useLinks as jest.Mock).mockReturnValue({
      userLinks: [],
    });

    const { findByText } = render(<SavedPage />);

    await findByText("No Saved Posts. Save new ones by adding your links.")
  });

  it("should list all saved posts", async () => {
    const oldPostOne = mockedResource();
    const oldPostTwo = mockedResource();

    (useLinks as jest.Mock).mockReturnValue({
      userLinks: [oldPostOne, oldPostTwo],
    });

    localStorage.setItem(SAVED_LINK_KEY, JSON.stringify([oldPostOne, oldPostTwo]));

    const { findByText, queryByText } = render(<SavedPage />);

    expect(queryByText("No Saved Posts. Save new ones by adding your links.")).toBeNull();

    await findByText(oldPostOne.og_title!);
    await findByText(oldPostTwo.og_title!);
  });

  // TODO: Refactor failing test.
  it("should delete an already saved post if is clicked on save button", async () => {
    const oldPostOne = mockedResource();

    let userLinks_ = [oldPostOne];

    (useLinks as jest.Mock)
      .mockImplementation(() => {

        return ({
          userLinks: userLinks_,
        });
      });

    (unsaveLink as jest.Mock)
      .mockImplementation((id : string) => {

        userLinks_ = userLinks_.filter((link) => link.id !== id);

        Promise.resolve(true);
      });

    const { findByTitle, queryByText, rerender } = render(<SavedPage />);

    const saveButton = await findByTitle("Save Button");

    act(() => {
      userEvent.click(saveButton);
    });

    rerender(<SavedPage />);

    expect(userLinks_).toHaveLength(0);

    const ogTitleEl = queryByText(oldPostOne.og_title ?? "");

    expect(ogTitleEl).toBeNull();
  });

  describe("Save custom URLs", () => {
    it("opens a dialog to insert URL", async () => {
      const { findByText, findByTitle } = render(<SavedPage />);

      userEvent.click(await findByTitle("Save a Link"));
      
      expect(findByText("Insert a URL you want to save"));
    });

  });
});

