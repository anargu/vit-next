import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { SubmitLinkForm } from "./SubmitLinkForm";

describe("SubmitLinkForm Component", () => {

  it("should throw error message when sending empty fields", async () => {
    const mockOnSubmit = jest.fn();

    const { findByRole, queryByText } = render(<SubmitLinkForm onSubmitWithData={mockOnSubmit} />);

    await act(async () => {
      const buttonEl = await findByRole("button", { name: /Save/i });
      fireEvent.submit(buttonEl);
    })

    const errorEl = queryByText("Error");
    expect(errorEl).not.toBeNull();

    expect(mockOnSubmit).not.toBeCalled();
  });

  it("should submit correct", async () => {
    const mockOnSubmit = jest.fn();

    const { findByRole, queryByText, findByPlaceholderText } = render(<SubmitLinkForm onSubmitWithData={mockOnSubmit} />);

    const inputEl = await findByPlaceholderText("Paste or type url");

    fireEvent.input(inputEl, {
      target: {
        value: "http://google.com" 
      }
    })

    await act(async () => {
      const buttonEl = await findByRole("button", { name: /Save/i });
      fireEvent.submit(buttonEl);
    })

    const errorEl = queryByText("Error");
    expect(errorEl).toBeNull();

    expect(mockOnSubmit).toBeCalled();
  });

  it("if input text has not http(s) prefix, then it should be added", async () => {
    const mockOnSubmit = jest.fn();

    const { findByRole, queryByText, findByPlaceholderText } = render(<SubmitLinkForm onSubmitWithData={mockOnSubmit} />);

    const inputEl = await findByPlaceholderText("Paste or type url");

    fireEvent.input(inputEl, {
      target: {
        value: "google.com" 
      }
    })

    await act(async () => {
      const buttonEl = await findByRole("button", { name: /Save/i });
      fireEvent.submit(buttonEl);
    })

    const errorEl = queryByText("Error");
    expect(errorEl).toBeNull();

    expect(mockOnSubmit).toBeCalled();
    expect(mockOnSubmit).toBeCalledWith("https://google.com");
  });
});
