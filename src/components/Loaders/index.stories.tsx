import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CircularLoader } from "./index";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Loaders',
  component: CircularLoader,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} as ComponentMeta<typeof CircularLoader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CircularLoader> = () => (
  <div className="bg-gray-100"><CircularLoader /></div>
);


export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};


