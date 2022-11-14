import { render } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { Resource, VITResource } from "@/src/core/entities";
import { DetailedCard, useDetailedCard } from "./DetailedCard";
import { useEffect } from "react";
import { userEvent } from "@storybook/testing-library";
import { mockedVITResource } from "../../../__tests__/utils";
faker.seed(1);

describe("DetailedCard", () => {

  it("renders the component", async () => {
    const resourceData = { ...mockedVITResource() };
    const { findByText } = render(<DetailedCard hit={Resource.fromVITResource(resourceData)} />);

    await findByText(resourceData.og_title || "");
    await findByText(resourceData.og_description || "");
    await findByText("Visit Site");
  });
});

describe("useDetailedCard", () => {
  it("should render null on detailedcard when hit state is null", async () => {
    const Scaffold = () => {
      const { show, DetailedCardWrapper } = useDetailedCard();

      return (<div><DetailedCardWrapper  /></div>);
    };

    const { container } = render(<Scaffold />);
    

    expect(container.firstChild?.childNodes).toHaveLength(0);
  });

  it("should render a detailedcard when there is hit data", async () => {
    const hit = mockedVITResource();

    const Scaffold = () => {
      const { show, DetailedCardWrapper } = useDetailedCard();

      useEffect(() => {
        show(Resource.fromVITResource({...hit}))
      }, []);

      return (<div><DetailedCardWrapper  /></div>);
    };

    const { container, findByText } = render(<Scaffold />);
    
    expect(container.firstChild?.childNodes).not.toHaveLength(0);
    await findByText("Visit Site");
  });
});
