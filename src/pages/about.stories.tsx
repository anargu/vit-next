import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AboutPage } from "./about";

export default {
  title: 'UI/AboutPage',
  component: AboutPage,
  argTypes: {
  },
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = (args : any) => (
  <AboutPage {...args} />
);

Template.story = {
  parameters: {
    nextRouter: {
      path: "/about",
      asPath: "/about",
      query: {},
    },
  },
}

export const Default = Template.bind({});

Default.args = {};

