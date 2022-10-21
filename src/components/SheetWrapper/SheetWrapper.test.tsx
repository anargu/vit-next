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

