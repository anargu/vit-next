
import { Switch } from '@mantine/core';
import React from 'react'

export type PrivacySettingProps = {
  isPublic : boolean,
  isDisabled? : boolean,
  onChangePrivacy: (newValue : boolean) => void | Promise<void>,
};

export const PrivacySetting = (props : PrivacySettingProps) => {
  return (
    <div>
      <Switch
        label="Make it public"
        checked={props.isPublic}
        disabled={props.isDisabled}
        onChange={(event) => props.onChangePrivacy(event.currentTarget.checked)}
      />
    </div>
  )
};

