import React from 'react';
import { Checkbox, withStyles } from '@material-ui/core';

const GreenCheckbox = withStyles({
  root: {
    color: '#41414d',
    '&$checked': {
      color: '#4caf50',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function CheckboxInput({ onClick, checked, onChange }) {
  return (
    <GreenCheckbox
      type="checkbox"
      onClick={onClick}
      checked={checked}
      onChange={onChange}
    />
  );
}
export default CheckboxInput;
