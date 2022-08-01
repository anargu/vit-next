import { VITResource } from "@/src/core/entities";
import { faker } from "@faker-js/faker";
import { MantineProvider } from "@mantine/core";
import { act, findByRole, render } from "@testing-library/react";
import { WithNotificationsProvider } from "../Notification/Notification";
import { ResourceCard, SAVED_LINK_KEY } from "./ResourceCard";

faker.seed(1);

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

    it("link is copied when hiperlink button is clicked ", async () => {
    });

    describe("Save", () => {

      it("post is saved on local storage among others previous saved posts when save button is clicked", async () => {
        const oldPost = mockedResource();
        localStorage.setItem(SAVED_LINK_KEY, JSON.stringify([oldPost]));

        const newPost = mockedResource();
        const { findByTitle, findByText } = render(
          <MantineProvider>
            <WithNotificationsProvider>
              <ResourceCard hit={newPost} />
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

        const { findByTitle, findByText } = render(
          <MantineProvider>
            <WithNotificationsProvider>
              <ResourceCard hit={mockedResource()} />
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
      });

      afterEach(() => {
        localStorage.removeItem(SAVED_LINK_KEY);
      });
    });


    it("open a share view when share button is clicked ", async () => {

    });

  });
});
