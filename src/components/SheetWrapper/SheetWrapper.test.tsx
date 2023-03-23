import { userEvent } from "@storybook/testing-library";
import { render } from "@testing-library/react";
import { useState } from "react";
import { act } from "react-dom/test-utils";
import { SheetWrapper } from "./SheetWrapper";

describe("SheetWrapper Component", () => {
  const DemoComponent = () => {
    const [show, setShow] = useState(false);

    return (
      <div>
        <SheetWrapper
          show={show}
          onBackgroundClicked={() => {
            setShow(false);
          }}
          onCloseSheet={() => {
            setShow(false);
          }}>
          <div>hello</div>
        </SheetWrapper>

        <button onClick={() => setShow(true) }>click</button>
      </div>
    );
  };

  it("opens when clicked to open", async () => {
    const { findByText } = render(
      <DemoComponent />
    );

    const buttonEl = await findByText("click");
    userEvent.click(buttonEl);

    await findByText("hello");
  });

  it("closes when key ESC is pressed", async () => {
    const { findByText, container, queryByText, getByTestId } = render(
      <DemoComponent />
    );

    await act(async () => {
      const buttonEl = await findByText("click");
      userEvent.click(buttonEl);
    });

    // Check if content inside Sheet is open and visible
    await findByText("hello");

    // Should close sheet
    await act(async () => {
      userEvent.type(container, "Escape");
      userEvent.keyboard("{Escape}");
    });

    // Check content inside wrapper now should not be visible
    expect(queryByText("hello")).toBeNull();
  });

  it("closes when close button it's clicked outside", async () => {
    const { findByText, queryByText, getByTestId } = render(
      <DemoComponent />
    );

    await act(async () => {
      const buttonEl = await findByText("click");
      userEvent.click(buttonEl);
    });

    await findByText("hello");

    await act(async () => {
      const backgroundEl = getByTestId("background");
      userEvent.click(backgroundEl);
    });

    expect(queryByText("hello")).toBeNull();
  });

  it("closes when close button is clicked", async () => {
    const { findByText, findByTitle, queryByText } = render(
      <DemoComponent />
    );

    await act(async () => {
      const buttonEl = await findByText("click");
      userEvent.click(buttonEl);
    });

    await findByText("hello");

    await act(async () => {
      const closeButtonEl = await findByTitle("close");
      userEvent.click(closeButtonEl);
    });

    expect(queryByText("hello")).toBeNull();
  });
});

