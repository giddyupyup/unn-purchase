import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { HomeHeader } from '../components/Headers';
import { ThankYou } from '../containers/ThankYou';

import { Redirect } from 'react-router-dom';
import { useTimeLeft } from '../hooks';

export default () => {
  //
  useEffect(() => {
    document.title = 'Union Finance | Thank You';
  }, []);

  const timeLeft = useTimeLeft('2020-12-03T14:00:00.000+00:00');
  if (timeLeft) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <HomeHeader />
      <ThankYou>
        <Typography
          color="textPrimary"
          align="justify"
          component="div"
          variant="h5"
        >
          Thank you for registering, the UNN team will be in touch with you if
          there are any issues with your registration for the token purchase
          event.
        </Typography>
      </ThankYou>
    </>
  );
};
