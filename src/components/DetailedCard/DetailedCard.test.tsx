import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";

import { DetailedCard } from "./DetailedCard";
import { DetailedCardSheet } from "./DetailedCardSheet";
import { Resource, VITResource } from "@/src/core/entities";
import { mockedVITResource } from "../../../__tests__/utils";

faker.seed(1);

describe("DetailedCard", () => {

  it("renders the component", async () => {
    const resourceData = { ...mockedVITResource() };
    const { findByText } = render(<DetailedCard resource={Resource.fromVITResource(resourceData)} />);

    await findByText(resourceData.og_title || "");
    await findByText(resourceData.og_description || "");
    await findByText("Visit Site");
  });

  it("shows public form when showPrivacySetting prop is true", async () => {
    const hit : VITResource = { ...mockedVITResource() };

    const SHOW_PRIVACY_TEXT = "Make it public";

    const { findByText } = render(<DetailedCard resource={Resource.fromVITResource(hit)} showPrivacySetting />);

    await findByText(SHOW_PRIVACY_TEXT);
  });
});

describe("useDetailedCard", () => {
  it("should render null on detailedcard when hit state is null", async () => {
    const Scaffold = () => {
      return (<div><DetailedCardSheet resource={null} /></div>);
    };

    const { queryByText } = render(<Scaffold />);
    
    expect(queryByText("Visit Site")).toBeNull();
  });

  /* it("should render a detailedcard when there is hit data", async () => { */
  /*   (listenLinkByID as jest.Mock).mockReturnValue(() => {}); */
  /**/
  /*   const hit = mockedVITResource(); */
  /**/
  /*   const Scaffold = () => { */
  /*     return (<div><DetailedCardSheet resourceId={"1"} /></div>); */
  /*   }; */
  /**/
  /*   const { container, findByText } = render(<Scaffold />); */
  /*    */
  /*   expect(container.firstChild?.childNodes).not.toHaveLength(0); */
  /*   await findByText("Visit Site"); */
  /* }); */
});
