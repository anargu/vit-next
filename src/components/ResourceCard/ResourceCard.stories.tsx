import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ResourceCard, ResourceCardProps } from "./ResourceCard";

import { faker } from "@faker-js/faker";
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

const mockHitData = () => ({
    id: faker.datatype.uuid(),
    imageSrc: "https://source.unsplash.com/random/50x50",
    imageAlt: "man holding a beer",
    postedAt: new Date(),
    title: "Inter Link",
    description: "This is a link, interlinked",
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
    imageAlt: faker.lorem.text(),
    title: faker.lorem.paragraph(2),
    description: faker.lorem.paragraphs(4),
  }
};

const FluidTemplate: ComponentStory<typeof ResourceCard> = (args : ResourceCardProps) => (
  <div className="bg-gray-100 h-[400px]"><ResourceCard {...args} /></div>
);

export const FluidLayout = FluidTemplate.bind({});

FluidLayout.args = {
  hit: {
    ...mockHitData(),
    imageAlt: faker.lorem.text(),
    title: faker.lorem.paragraph(2),
    description: faker.lorem.paragraphs(4),
  }
};

