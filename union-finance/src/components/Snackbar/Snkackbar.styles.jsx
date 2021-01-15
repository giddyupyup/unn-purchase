import styled from 'styled-components';

import { Alert } from '@material-ui/lab';
import { Close } from '@material-ui/icons';
import { Snackbar, IconButton } from '@material-ui/core';

//
export const StyledSnackbar = styled(Snackbar)``;

export const CloseIcon = styled(Close)`
  && {
    width: 22px;
    height: 22px;
  }
`;

export const StyledIconButton = styled(IconButton)`
  && {
    display: inline-flex;
    padding: 8px;
    width: 30px;
    height: 30px;
  }
`;

export const StyledAlert = styled(Alert)`
  && {
    display: flex;
    padding: 12px 16px;
    align-items: center;
    max-width: 675px;
    min-width: 300px;

    &.MuiAlert-standardSuccess {
      background-color: #7e6cff;

      .MuiAlert-icon {
        color: #fff;
      }

      .MuiAlert-message {
        display: flex;
        width: 100%;
        padding: 0;
        justify-content: space-between;

        span {
          display: flex;
          align-items: center;
          margin: 0 6px 0 0;
          font-size: 14px;
          color: #fff;
        }
      }
    }

    &.MuiAlert-standardWarning {
      background-color: #ffb03a;

      .MuiAlert-icon {
        color: #fff;
      }

      .MuiAlert-message {
        display: flex;
        width: 100%;
        padding: 0;
        justify-content: space-between;

        span {
          display: flex;
          align-items: center;
          margin: 0 6px 0 0;
          font-size: 14px;
          color: #fff;
        }
      }
    }

    &.MuiAlert-standardInfo {
      background-color: #d0e5fc;

      .MuiAlert-icon {
        color: #154180;
      }

      .MuiAlert-message {
        display: flex;
        width: 100%;
        padding: 0;
        justify-content: space-between;

        span {
          display: flex;
          align-items: center;
          margin: 0 6px 0 0;
          font-size: 14px;
          color: #154180;
        }
      }
    }

    &.MuiAlert-standardError {
      border: 1px solid #f5c6cb;
      background-color: #f8d7da;

      .MuiAlert-icon {
        color: #721c24;
      }

      .MuiAlert-message {
        display: flex;
        width: 100%;
        padding: 0;
        justify-content: space-between;

        span {
          display: flex;
          align-items: center;
          margin: 0 6px 0 0;
          font-size: 14px;
          color: #721c24;
        }
      }
    }
  }
`;
