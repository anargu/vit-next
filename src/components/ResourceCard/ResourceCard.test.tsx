import { SAVED_LINK_KEY } from "@/src/core/constants";
import { Resource, VITResource } from "@/src/core/entities";
import { faker } from "@faker-js/faker";
import { MantineProvider } from "@mantine/core";
import { userEvent } from "@storybook/testing-library";
import { act, render } from "@testing-library/react";
import { WithNotificationsProvider } from "../Notification/Notification";
import { ResourceCard } from "./ResourceCard";

faker.seed(1);

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

export const patternPostedAt = /\d+\s(m|h|hours?|days?|months?|years?)\sago/;

describe("ResourceCard", () => {

  const mockedVITResource = () : VITResource => ({
    id: faker.datatype.uuid(),
    og_image: "https://source.unsplash.com/random/50x50",
    keyphrase: faker.lorem.sentence(5),
    date_created: faker.datatype.datetime().toISOString(),
    og_title: faker.lorem.sentence(4),
    og_description: faker.lorem.sentence(12),
    url: faker.internet.url(),
    url_title: faker.lorem.sentence(4),
    is_public: false,
  });

  it("renders the component", async  () => {
    const { container } = render(<ResourceCard hit={mockedVITResource()} />);
    expect(container).toMatchSnapshot();
  });

  it("should appear DetailedCard Fullscreen Dialog when user taps on card", async  () => {
    const resourceData = { ...mockedVITResource() };

    const onShowDetailedCardMock = jest.fn();

    const { container } = render(
      <>
        <ResourceCard hit={resourceData} onShowDetailedCard={onShowDetailedCardMock} />
      </>
    );

    const resourceCard = container.firstElementChild;
    userEvent.click(resourceCard!);

    expect(onShowDetailedCardMock).toHaveBeenCalled();
  });

  describe("image field", () => {
    it("displays an image", async  () => {
      const resourceData = { ...mockedVITResource() };
      const { findByRole } = render(<ResourceCard hit={resourceData} />);

      const imageElement = findByRole("img");
      expect(imageElement).not.toBeFalsy();
    });

    it("renders no image if there is not src url", async  () => {
      const resourceData = { ...mockedVITResource(), og_image: null, keyphrase: null };
      const { container } = render(<ResourceCard hit={resourceData} />);

      const results = container.querySelectorAll("img");

      expect(results.length).toBe(0);
    });
  });

  describe("Title field", () => {

    it("displays title", async () => {

      const resourceData = mockedVITResource();

      const { findByText } = render(<ResourceCard hit={resourceData} />);

      const titleElement = await findByText(resourceData.og_title!);

      expect(titleElement).not.toBeFalsy();
    });

    it("displays url_title if title is null", async () => {
      const URL_TITLE = "this is a URL title";
      const hit : VITResource = { ...mockedVITResource(), og_title: null, url_title: URL_TITLE };

      const { findByText } = render(<ResourceCard hit={hit} />);

      const titleElement = await findByText(URL_TITLE);

      expect(titleElement).not.toBeFalsy();
    });

    it("displays url if title and url_title are not set", async () => {
      const URL = "https://www.google.com";
      const hit : VITResource = { ...mockedVITResource(), og_title: null, url_title: null, url: URL };

      const { findByText } = render(<ResourceCard hit={hit} />);

      const titleElement = await findByText(URL);

      expect(titleElement).not.toBeFalsy();
    });
  });

  describe("field postedAt", () => {

    it("displays \"now\" when postedAt diff with current time is lower than a minute", async () => {
      const hit = mockedVITResource();
      hit.date_created = new Date().toISOString();

      const { findByText } = render(<ResourceCard hit={hit} />);

      const postedAtElement = await findByText("now");

      expect(postedAtElement).not.toBeFalsy();
    });

    it("displays created time diff with current time if diff is greater than a minute ", async () => {
      const hit = mockedVITResource();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      hit.date_created = yesterday.toISOString();
      const { findByText } = render(<ResourceCard hit={hit} />);

      const postedAtElement = await findByText(patternPostedAt);

      expect(postedAtElement).not.toBeFalsy();
    });
  });

  describe("Actions", () => {

    describe("Save", () => {
      it("shows Error message notification when save fn fails", async () => {
        const errorMessage = "some Error";
        const saveResourceMock = jest.fn().mockImplementation(() => {
          return Promise.reject(Error(errorMessage));
        });

        const { findByTitle, findByText } = render(
          <MantineProvider>
            <WithNotificationsProvider>
              <ResourceCard
                onSaveResource={saveResourceMock}
                resource={Resource.fromVITResource(mockedVITResource())}
              />
            </WithNotificationsProvider>
          </MantineProvider>
        );

        await act(async () => {
          const saveButtonEl = await findByTitle("Save Button");
          saveButtonEl.click();
        });

        // Check if Notification is shown.
        await findByText(errorMessage);
        expect(saveResourceMock).toHaveBeenCalled();
      });

      it("shows Function not available Error when save fn is not set", async () => {
        const errorMessage = "Function not available yet.";

        const { findByTitle, findByText } = render(
          <MantineProvider>
            <WithNotificationsProvider>
              <ResourceCard
                isSaved={false}
                resource={Resource.fromVITResource(mockedVITResource())}
              />
            </WithNotificationsProvider>
          </MantineProvider>
        );

        await act(async () => {
          const saveButtonEl = await findByTitle("Save Button");
          saveButtonEl.click();
        });

        // Check if Notification is shown.
        await findByText(errorMessage);
      });

      it("post is saved on empty local storage when save button is clicked ", async () => {
        const saveResourceMock = jest.fn().mockImplementation(() => {
          return Promise.resolve(null);
        });

        const WrapperResourceCard = () => {
          return (
            <ResourceCard onSaveResource={saveResourceMock} hit={mockedVITResource()} />
          )
        };

        const { findByTitle } = render(
          <MantineProvider>
            <WithNotificationsProvider>
              <WrapperResourceCard/>
            </WithNotificationsProvider>
          </MantineProvider>
        );

        await act(async () => {
          const saveButtonEl = await findByTitle("Save Button");
          saveButtonEl.click();
        });

        // Check if Notification is shown.
        /* await findByText("Link saved locally."); */
        expect(saveResourceMock).toHaveBeenCalled();
      });

      afterEach(() => {
        localStorage.removeItem(SAVED_LINK_KEY);
      });
    });

    describe("Share", () => {
      jest.spyOn(navigator.clipboard, "writeText");

      it("link is copied on clipboard when share button is clicked ", async () => {
        const hit = mockedVITResource();
        hit.date_created = new Date().toISOString();

        const { findByTitle } = render(<ResourceCard hit={hit} />);

        await act(async () => {
          const shareButtonEl = await findByTitle("Share Button");
          shareButtonEl.click();
        });

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(hit.url);
      });
    });

  });
});
