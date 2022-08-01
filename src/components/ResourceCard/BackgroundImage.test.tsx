import { render } from "@testing-library/react";
import { BackgroundImage } from "./BackgroundImage";

describe("ContentImage", () => {
  it("renders element", async () => {
    const imageUrl = "https://d2dgum4gsvdsrq.cloudfront.net/assets/og-image-d0cb8fd5e692e4d428397f77401f6c7a43ffacdc6f5c917e93f5544b57acbecb.png";
    const { getByRole } = render(<BackgroundImage alt="alt image" src={imageUrl}/>);

    expect(getByRole("img")).toBeDefined();
  });
});
