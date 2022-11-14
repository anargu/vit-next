import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AuthUserMenuItem } from "./AuthUserMenuItem";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/AuthUserMenuItem',
  component: AuthUserMenuItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} as ComponentMeta<typeof AuthUserMenuItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AuthUserMenuItem> = (args : any) => (
  <div className="bg-gray-100"><AuthUserMenuItem {...args} /></div>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
};


