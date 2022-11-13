import { render, waitFor } from "@testing-library/react";
import { LoginPage } from "./login";
import { getSignInResult, upsertUser } from "../services/auth";
import { useRouter } from "next/router";
import { SAVED_LINK_KEY } from "../components/ResourceCard/ResourceCard";
import { migrateLocalData } from "../services/datasource";
import { WithNotificationsProvider } from "../components/Notification/Notification";

console.error = jest.fn();

jest.mock('../services/auth', () => {
  return {
    getSignInResult: jest.fn(),
    upsertUser: jest.fn(),
  };
});

jest.mock('next/router', () => {
  return {
    useRouter: jest.fn(),
  }
});

describe("Login", () => {
  it("renders login page", () => {
    const { container } = render(<LoginPage />);

    expect(container).toMatchSnapshot();
  });

  it("shows a loading visual feedback when it is loading for result while login", async () => {
    const loadingMessage = "We are syncing your data. Please wait a moment.";

    (getSignInResult as jest.Mock).mockImplementation(async () => {
      await new Promise((r) => setTimeout(r, 2000));

      return Promise.resolve({
        id: "1",
        displayName: "John Doe",
        email: "john@gmail.com",
      });
    });

    (upsertUser as jest.Mock).mockReturnValue(() => Promise.resolve(null));

    const pushMock = jest.fn();

    (useRouter as jest.Mock).mockImplementation(() => ({
      push: pushMock,
    }))

    const { getByText } = render(<LoginPage />);

    expect(getByText(loadingMessage)).toBeTruthy();
  });

  it("returns to home page when it returns authenticated user after login ", async () => {
    localStorage.removeItem(SAVED_LINK_KEY);

    (getSignInResult as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        id: "1",
        displayName: "John Doe",
        email: "john@gmail.com",
      });
    });

    (upsertUser as jest.Mock).mockReturnValue(() => Promise.resolve(null));

    const pushMock = jest.fn();

    (useRouter as jest.Mock).mockImplementation(() => ({
      push: pushMock,
    }))

    render(<LoginPage />);

    await waitFor(() => {
      expect(getSignInResult as jest.Mock).toHaveBeenCalled();
      expect(upsertUser as jest.Mock).toHaveBeenCalled();
      expect(pushMock as jest.Mock).toHaveBeenCalled();
    });
  });

  // Error handling
  it("shows error message alert when login failed", async () => {
    const errorMessage = "Failed authentication";

    (getSignInResult as jest.Mock).mockImplementation(() => {
      return Promise.reject(new Error(errorMessage));
    });

    const { getByText } = render(<LoginPage />);

    await waitFor(() => {
      getByText(errorMessage);
    });
  });

  it("shows general error message alert when login failed and not error message is provided", async () => {
    const errorMessage = "Please try again";

    (getSignInResult as jest.Mock).mockReturnValue(Promise.reject({}));

    const { getByText } = render(<LoginPage />);

    await waitFor(() => {
      getByText(errorMessage);
    });
  });

  describe("User Data Migration", () => {
    it("throws a message if upload of transformed data fails", async () => {
      (getSignInResult as jest.Mock).mockImplementation(() => {
        return Promise.resolve({
          id: "1",
          displayName: "John Doe",
          email: "john@gmail.com",
        });
      });

      (migrateLocalData as jest.Mock).mockImplementation(() => Promise.reject(new Error("it failed")));

      const { getByText } = render(<LoginPage />);

      await waitFor(() => {
        getByText(("it failed"));
      });
    });

    it("shows notification if data migration succeeds", async () => {
      const message = "Migration of local data succeeded!";

      (migrateLocalData as jest.Mock).mockImplementation(() => Promise.resolve(true));

      const { getByText } = render(
        <WithNotificationsProvider>
          <LoginPage />
        </WithNotificationsProvider>
      );

      await waitFor(() => {
        getByText((message));
      });
    });
  });
});

