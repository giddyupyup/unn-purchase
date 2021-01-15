import React from 'react';
import { useLocation } from 'react-router-dom';
import { HomeHeader } from '../components/Headers';
import { KycSale } from '../containers/KYC';

import { Redirect } from 'react-router-dom';
import { useTimeLeft } from '../hooks';

export default () => {
  //
  const timeLeft = useTimeLeft('2020-12-03T14:00:00.000+00:00');
  if (timeLeft) {
    return <Redirect to="/" />;
  }

  const location = useLocation();
  let status = 'begin';
  if (location.pathname.indexOf('success') !== -1) status = 'success';
  if (location.pathname.indexOf('failed') !== -1) status = 'failed';
  return (
    <>
      <HomeHeader />
      <KycSale status={status} />
    </>
  );
};
