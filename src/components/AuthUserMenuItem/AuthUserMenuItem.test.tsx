import { render } from "@testing-library/react";
import { useAuth } from "@/src/hooks/useAuth";
import { AuthUserMenuItem } from "./AuthUserMenuItem";
import { AuthenticatedUser } from "@/src/services/auth";

jest.mock("@/src/hooks/useAuth", () => {
  return ({
    useAuth: jest.fn(() => ({
      isAuthenticated: false,
      authUser: null,
    })),
  });
});

describe("AuthUserMenuItem", () => {
  it("renders AuthUserMenuItem", () => {
    const { container } = render(<AuthUserMenuItem />);

    expect(container).toMatchSnapshot();
  });

  it("shows sign In option if user is not authenticated", () => {
    const menuText = "Sign In";

    const { getByText } = render(<AuthUserMenuItem />);

    expect(getByText(menuText))
  });

  it("shows login option if user is not authenticated", () => {
    const menuText = "Log out";
    const authUser_ : AuthenticatedUser = {
      id: "1",
      email: "abc@gmail.com",
      displayName: "abc",
    };

    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      authUser: authUser_,
    });

    const { getByText } = render(<AuthUserMenuItem />);

    expect(getByText(menuText))
    expect(getByText(`Hi ${authUser_.email}`));
  });
});
