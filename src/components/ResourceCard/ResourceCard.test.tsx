import { VITResource } from "@/src/core/entities";
import { useSavedResources } from "@/src/hooks/useSavedResources";
import { faker } from "@faker-js/faker";
import { MantineProvider } from "@mantine/core";
import { userEvent } from "@storybook/testing-library";
import { act, findByRole, render } from "@testing-library/react";
import { WithNotificationsProvider } from "../Notification/Notification";
import { ResourceCard, SAVED_LINK_KEY } from "./ResourceCard";

faker.seed(1);

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

export const patternPostedAt = /\d+\s(m|h|hours?|days?|months?|years?)\sago/;

describe("ResourceCard", () => {

  const mockedResource = () : VITResource => ({
    id: faker.datatype.uuid(),
    og_image: "https://source.unsplash.com/random/50x50",
    keyphrase: faker.lorem.sentence(5),
    date_created: faker.datatype.datetime().toISOString(),
    og_title: faker.lorem.sentence(4),
    og_description: faker.lorem.sentence(12),
    url: faker.internet.url(),
    url_title: faker.lorem.sentence(4),
  });

  it("renders the component", async  () => {
    const { container } = render(<ResourceCard hit={mockedResource()} />);
    expect(container).toMatchSnapshot();
  });

  it("should appear DetailedCard Fullscreen Dialog when user taps on card", async  () => {
    const resourceData = { ...mockedResource() };
    const { findByText, container } = render(<ResourceCard hit={resourceData} />);

    const resourceCard = container.firstElementChild;
    userEvent.click(resourceCard!);

    const element = await findByText("Visit Site");
    expect(element).not.toBeNull();
  });

  describe("image field", () => {
    it("displays an image", async  () => {
      const resourceData = { ...mockedResource() };
      const { findByRole } = render(<ResourceCard hit={resourceData} />);

      const imageElement = findByRole("img");
      expect(imageElement).not.toBeFalsy();
    });

    it("renders no image if there is not src url", async  () => {
      const resourceData = { ...mockedResource(), og_image: null, keyphrase: null };
      const { container } = render(<ResourceCard hit={resourceData} />);

      const results = container.querySelectorAll("img");

      expect(results.length).toBe(0);
    });
  });

  describe("Title field", () => {

    it("displays title", async () => {

      const resourceData = mockedResource();

      const { findByText } = render(<ResourceCard hit={resourceData} />);

      const titleElement = await findByText(resourceData.og_title!);

      expect(titleElement).not.toBeFalsy();
    });

    it("displays url_title if title is null", async () => {
      const URL_TITLE = "this is a URL title";
      const hit : VITResource = { ...mockedResource(), og_title: null, url_title: URL_TITLE };

      const { findByText } = render(<ResourceCard hit={hit} />);

      const titleElement = await findByText(URL_TITLE);

      expect(titleElement).not.toBeFalsy();
    });

    it("displays url if title and url_title are not set", async () => {
      const URL = "https://www.google.com";
      const hit : VITResource = { ...mockedResource(), og_title: null, url_title: null, url: URL };

      const { findByText } = render(<ResourceCard hit={hit} />);

      const titleElement = await findByText(URL);

      expect(titleElement).not.toBeFalsy();
    });
  });

  describe("field postedAt", () => {

    it("displays \"now\" when postedAt diff with current time is lower than a minute", async () => {
      const hit = mockedResource();
      hit.date_created = new Date().toISOString();

      const { findByText } = render(<ResourceCard hit={hit} />);

      const postedAtElement = await findByText("now");

      expect(postedAtElement).not.toBeFalsy();
    });

    it("displays created time diff with current time if diff is greater than a minute ", async () => {
      const hit = mockedResource();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      hit.date_created = yesterday.toISOString();
      const { findByText } = render(<ResourceCard hit={hit} />);

      const postedAtElement = await findByText(patternPostedAt);

      expect(postedAtElement).not.toBeFalsy();
    });
  });

  describe("Actions", () => {

    // it("display a more detailed page when clicked on card but not ", async () => {
    //   const { findByText } = render(<ResourceCard hit={mockedResource()} />);
    //
    //   expect(await findByText("Visit site")).not.toBeFalsy();
    // });

    describe("Save", () => {

      it("post is saved on local storage among others previous saved posts when save button is clicked", async () => {
        const oldPost = mockedResource();
        localStorage.setItem(SAVED_LINK_KEY, JSON.stringify([oldPost]));

        const newPost = mockedResource();

        const WrapperResourceCard = () => {
          const { saveResource } = useSavedResources();

          return (
            <ResourceCard onSaveResource={saveResource} hit={newPost} />
          )
        };

        const { findByTitle, findByText } = render(
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

        await findByText("Link saved locally.");
        const value = localStorage.getItem(SAVED_LINK_KEY);
        expect(value).not.toBeFalsy();
        expect(value).not.toBeNull();

        const actualSavedPosts = JSON.parse(value!)
        expect(actualSavedPosts).toHaveLength(2);
        expect(actualSavedPosts[0]).toStrictEqual(oldPost);
        expect(actualSavedPosts[1]).toStrictEqual(newPost);
      });

      it("post is saved on empty local storage when save button is clicked ", async () => {
        localStorage.removeItem(SAVED_LINK_KEY);

        const WrapperResourceCard = () => {
          const { saveResource } = useSavedResources();

          return (
            <ResourceCard onSaveResource={saveResource} hit={mockedResource()} />
          )
        };

        const { findByTitle, findByText } = render(
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
        await findByText("Link saved locally.");
        const value = localStorage.getItem(SAVED_LINK_KEY);
        expect(value).not.toBeFalsy();
      });

      afterEach(() => {
        localStorage.removeItem(SAVED_LINK_KEY);
      });
    });

    describe("Share", () => {
      jest.spyOn(navigator.clipboard, "writeText");

      it("link is copied on clipboard when share button is clicked ", async () => {
        const hit = mockedResource();
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
