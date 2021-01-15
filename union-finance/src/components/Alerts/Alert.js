import React from 'react';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { CheckCircle, Error, Warning } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.common.white,
  },
  box: {
    padding: 15,
  },
  icon: {
    display: 'flex',
    marginRight: 10,
  },
  errorColor: {
    borderRadius: 4,
    color: theme.palette.error.dark,
    backgroundColor: theme.palette.error.light + '4D',
  },
  warningColor: {
    borderRadius: 4,
    color: theme.palette.warning.dark,
    backgroundColor: theme.palette.warning.light + '4D',
  },
  infoColor: {
    borderRadius: 4,
    color: theme.palette.info.dark,
    backgroundColor: theme.palette.info.light + '4D',
  },
  successColor: {
    borderRadius: 4,
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.success.light + '4D',
  },
}));

export default ({ severity = 'info', children, addedClass, ...props }) => {
  const {
    container,
    icon,
    errorColor,
    warningColor,
    infoColor,
    successColor,
  } = useStyles();

  const SEVERITY = {
    error: {
      icon: <Error />,
      class: errorColor,
    },
    warning: {
      icon: <Warning />,
      class: warningColor,
    },
    info: {
      icon: <Error />,
      class: infoColor,
    },
    success: {
      icon: <CheckCircle />,
      class: successColor,
    },
  };

  return (
    <Paper className={container}>
      <Box
        padding={2}
        display="flex"
        alignItems="center"
        className={clsx(SEVERITY[severity].class, addedClass)}
      >
        <div className={icon}> {SEVERITY[severity].icon} </div>
        <div>
          <Typography component="span" variant="body2">
            {' '}
            {children}{' '}
          </Typography>
        </div>
      </Box>
    </Paper>
  );
};
