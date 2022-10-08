import React from 'react';
import { NotificationsProvider, showNotification as mantineNotification } from '@mantine/notifications';
import { DefaultMantineColor } from '@mantine/core';

export type NotificationProps = {
  children?: JSX.Element;
};

export type NotificationOptions = {
  color?: DefaultMantineColor | undefined | string,
}

export const showNotification = (message: string, title : string = "Information", options: NotificationOptions) => {
  mantineNotification({
    title: title,
    message: message,
    color: options?.color ?? "indigo",
  });
};

export const showDefaultNotification = (message: string, title : string = "Information") => {
  mantineNotification({
    message,
    title,
    color: "indigo",
  });
};


export const WithNotificationsProvider = (props : NotificationProps) : JSX.Element => {
  if (!props.children) return <div />;

  return <NotificationsProvider>{props.children}</NotificationsProvider>;
};
