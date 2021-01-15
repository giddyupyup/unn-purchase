import styled from 'styled-components';
import { FormControlLabel, Checkbox } from '@material-ui/core';

import { SvgCheckboxCheckedIcon } from '../../static/icons/CheckboxChecked';

//
export const StyledFormControlLabel = styled(FormControlLabel)`
  && {
    display: flex;
    align-items: center;
    margin-right: 0;

    .MuiCheckbox-root {
      color: #ccc;
    }

    .Mui-checked {
      color: #7e6cff;
    }

    .MuiTypography-root {
      color: #666;
      font-size: 14px;
      font-weight: normal;
      line-height: 19px;
      font-family: 'Open Sans', sans-serif;

      span {
        display: inline-block;
        margin: 0 42px 0 20px;
        font-weight: 600;
      }
    }
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  && {
    .MuiSvgIcon-root {
      font-size: 16px;
    }

    .PrivateSwitchBase-root-25 {
      padding: 6px;
    }
  }
`;

export const CheckboxCheckedIcon = styled(SvgCheckboxCheckedIcon)`
  && {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const CheckContent = styled.div`
  display: block;
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

export const CheckedContent = styled.div`
  display: block;
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  box-sizing: border-box;
  border: 1px solid #7e6cff;
  background-color: #7e6cff;
`;
