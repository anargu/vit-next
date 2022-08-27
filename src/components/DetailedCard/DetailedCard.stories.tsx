import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DetailedCard, DetailedCardProps } from "./DetailedCard";

import { faker } from "@faker-js/faker";
import { VITResource } from '@/src/core/entities';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/DetailedCard',
  component: DetailedCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} as ComponentMeta<typeof DetailedCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DetailedCard> = (args : DetailedCardProps) => (
  <div className="bg-gray-100"><DetailedCard {...args} /></div>
);

const mockHitData = () : VITResource => ({
  id: faker.datatype.uuid(),
  og_image: "https://source.unsplash.com/random/50x50",
  keyphrase: "man holding a beer",
  date_created: faker.datatype.datetime().toISOString(),
  og_title: "Inter Link",
  og_description: "This is a link, interlinked",
  url_title: "The link",
  url: "https://www.google.com",
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  hit: mockHitData(),
};

