import styled from 'styled-components';
import {
  Button,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core';
import { Info, Close, ErrorOutline } from '@material-ui/icons';

//
export const StyledDialog = styled(Dialog)`
  && {
    .MuiPaper-root {
      max-width: 675px;
      background: #fff;
    }
  }
`;

export const StyledDialogTitle = styled(DialogTitle)``;

export const StyledDialogContent = styled(DialogContent)`
  && {
    display: block;
    position: relative;
    padding: 50px 35px;
  }
`;

export const StyledDialogContentText = styled(DialogContentText)`
  && {
    display: flex;

    span {
      display: block;
      margin: 0 25px 0 0;
      color: #333;
    }
  }
`;

export const StyledCloseIcon = styled(Close)`
  && {
    color: #333;
  }
`;

export const StyledInfoIcon = styled(Info)`
  && {
    top: 5px;
    color: #333;
    position: relative;
  }
`;

export const StyledErrorOutlineIcon = styled(ErrorOutline)`
  && {
    top: 6px;
    color: #333;
    position: relative;
    margin-right: 2px;
  }
`;

export const StyledIconButton = styled(IconButton)`
  && {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    z-index: 100;
  }
`;

export const StyledButton = styled(Button)`
  && {
    font-size: 18px;
    padding: 5px 50px;
  }
`;

export const StyledDialogActions = styled(DialogActions)`
  && {
    padding: 5px 8px 25px;
    justify-content: center;
  }
`;
