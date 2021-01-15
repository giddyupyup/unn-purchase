import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  griditem: {
    display: 'flex',
    justifyContent: 'center',
  },
  number: {
    fontWeight: 400,
  },
  label: {
    fontWeight: 200,
    textTransform: 'uppercase',
  },
});

export default ({ time, timeLabel }) => {
  const { griditem, number, label } = useStyles();
  const timePadded = time.toString().padStart(2, '0');
  return (
    <Grid container direction="column">
      <Grid item className={griditem}>
        <Typography
          className={number}
          color="textPrimary"
          component="div"
          variant="h1"
        >
          {timePadded}
        </Typography>
      </Grid>
      <Grid item className={griditem}>
        <Typography
          className={label}
          color="textPrimary"
          component="div"
          variant="h4"
        >
          {' '}
          {timeLabel}
        </Typography>
      </Grid>
    </Grid>
  );
};
