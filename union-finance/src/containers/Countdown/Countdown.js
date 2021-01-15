import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { CountdownBottom } from '../../components/Countdowns';

export default ({ timeLeft, ...props }) => {
  return (
    <Grid container justify="center" spacing={3}>
      <Grid item>
        <CountdownBottom time={timeLeft.days} timeLabel="days" />
      </Grid>
      <Grid item>
        <Typography
          color="textPrimary"
          component="div"
          variant="h1"
          align="center"
        >
          :
        </Typography>
      </Grid>
      <Grid item>
        <CountdownBottom time={timeLeft.hours} timeLabel="hours" />
      </Grid>
      <Grid item>
        <Typography
          color="textPrimary"
          component="div"
          variant="h1"
          align="center"
        >
          :
        </Typography>
      </Grid>
      <Grid item>
        <CountdownBottom time={timeLeft.minutes} timeLabel="mins" />
      </Grid>
      <Grid item>
        <Typography
          color="textPrimary"
          component="div"
          variant="h1"
          align="center"
        >
          :
        </Typography>
      </Grid>
      <Grid item>
        <CountdownBottom time={timeLeft.seconds} timeLabel="secs" />
      </Grid>
    </Grid>
  );
};
