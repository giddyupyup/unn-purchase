import * as React from 'react';

import {
  CloseIcon,
  StyledAlert,
  StyledSnackbar,
  StyledIconButton,
} from './Snkackbar.styles';

//
const Snackbar = ({ open, status, message, handleClose }) => {
  return (
    <StyledSnackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <StyledAlert severity={status}>
        <span>{message}</span>
        <StyledIconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </StyledIconButton>
      </StyledAlert>
    </StyledSnackbar>
  );
};

export { Snackbar };
