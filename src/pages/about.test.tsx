import { render } from "@testing-library/react";
import { AboutPage } from "./about";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: () => {
    return {
      push: () => {},
      pathname: "/about",
    };
  },
}));

describe("About", () => {
  it("renders about view", async () => {
    const { container } = render(<AboutPage />);
    expect(container).toMatchSnapshot();
  });
});

