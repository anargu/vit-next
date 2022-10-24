import { userEvent } from "@storybook/testing-library";
import { findByPlaceholderText, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
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

    await findByText("No Saved Posts. Save new ones by adding your links.")
  });

  it("should list all saved posts", async () => {
    const oldPostOne = mockedResource();
    const oldPostTwo = mockedResource();

    localStorage.setItem(SAVED_LINK_KEY, JSON.stringify([oldPostOne, oldPostTwo]));

    const { findByText, queryByText } = render(<SavedPage />);

    expect(queryByText("No Saved Posts. Save new ones by adding your links.")).toBeNull();

    await findByText(oldPostOne.og_title!);
    await findByText(oldPostTwo.og_title!);
  });

  it("should delete an already saved post if is clicked on save button", async () => {
    const oldPostOne = mockedResource();

    localStorage.setItem(SAVED_LINK_KEY, JSON.stringify([oldPostOne]));

    const { findByTitle, queryByText } = render(<SavedPage />);

    const saveButton = await findByTitle("Save Button");

    act(() => {
      userEvent.click(saveButton);
    });

    const ogTitleEl = queryByText(oldPostOne.og_title ?? "");

    expect(ogTitleEl).toBeNull();
  });

  describe("Save custom URLs", () => {
    it("opens a dialog to insert URL", async () => {
      const { findByText, findByTitle } = render(<SavedPage />);

      userEvent.click(await findByTitle("Save a Link"));
      
      expect(findByText("Insert a URL you want to save"));
    });

    // TODO: Move to a unit test in SubmitLinkForm Component
    /* it("saves locally the provided url on text input and pressed Save", async () => { */
    /*   const PLACEHOLDER = "Paste or type url"; */
    /*   const { findByText, findByTitle, findByPlaceholderText, queryByText } = render(<SavedPage />); */
    /**/
    /*   userEvent.click(await findByTitle("Save a Link")); */
    /*   const inputEl = await findByPlaceholderText(PLACEHOLDER); */
    /*   expect(inputEl).not.toBeFalsy(); */
    /**/
    /*   const URL_TO_SAVE = "https://www.google.com"; */
    /*   userEvent.paste(inputEl, URL_TO_SAVE); */
    /**/
    /*   await act(async () => { */
    /*     const buttonEl = await findByText("Save"); */
    /*     userEvent.click(buttonEl); */
    /*   }); */
    /**/
    /*   const value = localStorage.getItem(SAVED_LINK_KEY); */
    /*   expect(value).not.toBeFalsy(); */
    /*   expect(value).toMatch(URL_TO_SAVE); */
    /**/
    /*   const text = queryByText(PLACEHOLDER); */
    /*   expect(text).toBeNull(); */
    /* }); */
  });
});

