import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { IndexPage } from "./index";

export default {
  title: 'UI/IndexPage',
  component: IndexPage,
  argTypes: {
  },
} as ComponentMeta<typeof IndexPage>;

const Template: ComponentStory<typeof IndexPage> = (args : any) => (
  <IndexPage {...args} />
);

export const Default = Template.bind({});

Default.args = {};

