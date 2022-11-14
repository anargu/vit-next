import { fireEvent, render } from "@testing-library/react";
import { NavBarItemMenu } from "./NavBarMenu";

describe("NavBarMenuItem", () => {
  it("show up menu when click on the NavBarItemMenu", async () => {
    const { container, getByText } = render(<NavBarItemMenu menu={[{label: "A", url: "/A"}]}>ItemContent</NavBarItemMenu>);
    const menuContainer = container.querySelector(".hidden");
    expect(menuContainer).toBeTruthy();

    const navItem = getByText("ItemContent");
    fireEvent.click(navItem);

    expect(menuContainer).not.toHaveClass("hidden");
  });

  it("collapses menu when click outside menu", async () => {
    const { container, getByText } = render(
      <div>
        <NavBarItemMenu menu={[{label: "A", url: "/A"}]}>ItemContent</NavBarItemMenu>
        <span>Other</span>
      </div>
    );
    const menuContainer = container.querySelector(".hidden");

    const navItem = getByText("ItemContent");
    fireEvent.click(navItem);

    const otherElement = getByText("Other");
    fireEvent.click(otherElement);

    expect(otherElement).toBeTruthy();

    expect(menuContainer).toHaveClass("hidden");
  });

  it("calls function defined when menu item has a function to execute", async () => {

    const onClickMock = jest.fn();

    const { getByText } = render(
      <div>
        <NavBarItemMenu
          menu={[
            {label: "A", onClick: onClickMock }
          ]}
        >
          ItemContent
        </NavBarItemMenu>
        <span>Other</span>
      </div>
    );

    const navItem = getByText("ItemContent");
    fireEvent.click(navItem);

    const itemMenu = getByText("A");
    fireEvent.click(itemMenu);

    expect(onClickMock).toHaveBeenCalled();
  });
});

