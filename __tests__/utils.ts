import { VITResource } from "@/src/core/entities";
import { faker } from "@faker-js/faker";

faker.seed(1);

export const mockedVITResource = () : VITResource => ({
  id: faker.datatype.uuid(),
  is_public: true,
  og_image: "https://source.unsplash.com/random/50x50",
  keyphrase: faker.lorem.sentence(5),
  date_created: faker.datatype.datetime().toISOString(),
  og_title: faker.lorem.sentence(4),
  og_description: faker.lorem.sentence(12),
  url: faker.internet.url(),
  url_title: faker.lorem.sentence(4),
});
