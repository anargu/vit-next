import React from 'react';
import { NotificationsProvider, showNotification } from '@mantine/notifications';

export type NotificationProps = {
  children?: JSX.Element;
};

export const showDefaultNotification = (message: string, title : string = "Information") => {
  showNotification({
    title: title,
    message: message,
  });
};

export const WithNotificationsProvider = (props : NotificationProps) : JSX.Element => {
  if (!props.children) return <div />;

  return <NotificationsProvider>{props.children}</NotificationsProvider>;
};
