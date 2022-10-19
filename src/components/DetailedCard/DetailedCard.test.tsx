import { render } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { VITResource } from "@/src/core/entities";
import { DetailedCard, useDetailedCard } from "./DetailedCard";
import { useEffect } from "react";
import { userEvent } from "@storybook/testing-library";
import { mockedResource } from "../../../__tests__/utils";
faker.seed(1);

describe("DetailedCard", () => {

  it("renders the component", async () => {
    const resourceData = { ...mockedResource() };
    const { findByText } = render(<DetailedCard hit={resourceData} />);

    await findByText(resourceData.og_title || "");
    await findByText(resourceData.og_description || "");
    await findByText("Visit Site");
  });
});

describe("useDetailedCard", () => {
  it("should render null on detailedcard when hit state is null", async () => {
    const Scaffold = () => {
      const { show, detailedCard } = useDetailedCard();

      return (<div>{detailedCard}</div>);
    };

    const { container } = render(<Scaffold />);
    

    expect(container.firstChild?.childNodes).toHaveLength(0);
  });

  it("should render a detailedcard when there is hit data", async () => {
    const hit = mockedResource();

    const Scaffold = () => {
      const { show, detailedCard } = useDetailedCard();

      useEffect(() => {
        show({...hit})
      }, []);

      return (<div>{detailedCard}</div>);
    };

    const { container, findByText } = render(<Scaffold />);
    
    expect(container.firstChild?.childNodes).not.toHaveLength(0);
    await findByText("Visit Site");
  });
});
