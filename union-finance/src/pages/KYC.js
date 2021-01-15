import React, { useEffect } from 'react';
import { HomeHeader } from '../components/Headers';
import { KycContainer } from '../containers/KYC';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../redux/actions';

import { Redirect } from 'react-router-dom';
import { useTimeLeft } from '../hooks';

export default () => {
  //
  const dispatch = useDispatch();

  const timeLeft = useTimeLeft('2020-12-03T14:00:00.000+00:00');
  if (timeLeft) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    document.title = 'Union Finance | Sale Pre-Check';
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
    (async () => {
      dispatch(await getUserInfo());
    })();
  }, [dispatch]);

  return (
    <>
      <HomeHeader />
      <KycContainer steps={4} precheck />
    </>
  );
};
