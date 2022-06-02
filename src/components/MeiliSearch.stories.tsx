import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MeiliSearchBar } from "./MeiliSearch";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/MeiliSearchBar',
  component: MeiliSearchBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} as ComponentMeta<typeof MeiliSearchBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MeiliSearchBar> = (args : any) => (
  <div className="bg-gray-200"><MeiliSearchBar {...args} /></div>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
};

