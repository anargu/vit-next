import { MantineProvider } from "@mantine/core";
import { act, render } from "@testing-library/react";
import { showDefaultNotification, WithNotificationsProvider } from "./Notification";

describe("Notification", () => {

  it("renders a notification when it is called", async () => {
    const phraseToNotify = "This is a message";

    const { findByText } = render(
      <MantineProvider>
        <WithNotificationsProvider>
          <div>Hi</div>
        </WithNotificationsProvider>
      </MantineProvider>
    );

    act(() => {
      showDefaultNotification(phraseToNotify);
    });


    await findByText(phraseToNotify);
  });
});
