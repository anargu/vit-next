import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SavedPage } from "./saved";

export default {
  title: 'UI/SavedPage',
  component: SavedPage,
  argTypes: {
  },
} as ComponentMeta<typeof SavedPage>;

const Template: ComponentStory<typeof SavedPage> = (args : any) => (
  <SavedPage {...args} />
);

Template.story = {
  parameters: {
    nextRouter: {
      path: "/saved",
      asPath: "/saved",
      query: {},
    },
  },
}

export const Default = Template.bind({});

Default.args = {};

