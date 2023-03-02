
import { Switch } from '@mantine/core';
import React from 'react'

export type PrivacySettingProps = {
  isPublic : boolean,
  onChangePrivacy: (newValue : boolean) => void | Promise<void>,
};

export const PrivacySetting = (props : PrivacySettingProps) => {
  return (
    <div>
      <Switch
        label="Make it public"
        checked={props.isPublic}
        onChange={(event) => props.onChangePrivacy(event.currentTarget.checked)}
      />
    </div>
  )
};

