import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ResourceCard, ResourceCardProps } from "./ResourceCard";

import { faker } from "@faker-js/faker";
import { VITResource } from '@/src/core/entities';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/ResourceCard',
  component: ResourceCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} as ComponentMeta<typeof ResourceCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ResourceCard> = (args : ResourceCardProps) => (
  <div className="bg-gray-100 w-[300px] h-[400px]"><ResourceCard {...args} /></div>
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

export const LongText = Template.bind({});

LongText.args = {
  hit: {
    ...mockHitData(),
    og_title: faker.lorem.paragraph(2),
    og_description: faker.lorem.paragraphs(4),
  }
};

const FluidTemplate: ComponentStory<typeof ResourceCard> = (args : ResourceCardProps) => (
  <div className="bg-gray-100 h-[400px]"><ResourceCard {...args} /></div>
);

export const FluidLayout = FluidTemplate.bind({});

FluidLayout.args = {
  hit: {
    ...mockHitData(),
    og_title: faker.lorem.paragraph(2),
    og_description: faker.lorem.paragraphs(4),
  }
};

export const NoImage = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoImage.args = {
  hit: {
    ...mockHitData(),
    og_image: null,
  }
};
