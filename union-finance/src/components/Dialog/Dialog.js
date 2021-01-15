import React from 'react';
import Slide from '@material-ui/core/Slide';

import {
  StyledDialog,
  StyledButton as Button,
  StyledCloseIcon as CloseIcon,
  StyledIconButton as IconButton,
  StyledDialogActions as DialogActions,
  StyledDialogContent as DialogContent,
  StyledErrorOutlineIcon as ErrorOutlineIcon,
  StyledDialogContentText as DialogContentText,
} from './Dialog.styles';

//
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//
const Dialog = ({ open, onClose }) => (
  <StyledDialog open={open} TransitionComponent={Transition}>
    <IconButton aria-label="close" onClick={onClose}>
      <CloseIcon />
    </IconButton>
    <DialogContent>
      <DialogContentText>
        <span>
          <ErrorOutlineIcon /> This wallet was not approved for KYC. Please
          choose a different Wallet or wait a few minutes for transaction to
          process on Ethereum and try again.
        </span>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary" variant="outlined">
        OK
      </Button>
    </DialogActions>
  </StyledDialog>
);

export { Dialog };
