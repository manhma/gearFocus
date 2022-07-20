import { Switch } from '@mui/material';
import React from 'react';

function SwitchForm({ defaultChecked, field }: any) {
    return <Switch checked={field.value} {...field} defaultChecked={defaultChecked} />;
}

export default SwitchForm;
