import React from 'react';

import {
  CheckContent,
  CheckedContent,
  StyledCheckbox,
  StyledFormControlLabel,
  CheckboxCheckedIcon as CheckedIcon,
} from './Checkbox.styles';

//
const Checkbox = ({ id, label, value, checked, onChange }) => (
  <StyledFormControlLabel
    control={
      <StyledCheckbox
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        icon={<CheckContent />}
        checkedIcon={
          <CheckedContent>
            <CheckedIcon />
          </CheckedContent>
        }
      />
    }
    label={label}
  />
);

export { Checkbox };
