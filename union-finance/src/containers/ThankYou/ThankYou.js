import React from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { Check } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
    marginBottom: 50,
    paddingRight: 30,
    paddingLeft: 30,
  },
  box: {
    display: 'flex',
    borderRadius: '50%',
    backgroundColor: '#58CF81',
    padding: 5,
    marginRight: 20,
  },
  check: {
    color: theme.palette.common.white,
    width: '2.5em',
    height: '2.5em',
    [theme.breakpoints.only('xs')]: {
      width: '2em',
      height: '2em',
    },
  },
  thanks: {
    fontWeight: 600,
    [theme.breakpoints.only('sm')]: {
      fontSize: '2.5rem',
    },
    [theme.breakpoints.only('xs')]: {
      fontSize: '2rem',
    },
  },
  griditem: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default ({ children, ...props }) => {
  const { container, box, check, thanks, griditem } = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={8}
      direction="column"
      className={container}
    >
      <Grid item className={griditem}>
        <Box component="span" className={box}>
          <Check color="primary" className={check} />
        </Box>
        <Typography
          className={thanks}
          color="textPrimary"
          component="div"
          variant="h3"
        >
          Thank you!
        </Typography>
      </Grid>
      <Grid item className={griditem}>
        {children}
      </Grid>
    </Grid>
  );
};
