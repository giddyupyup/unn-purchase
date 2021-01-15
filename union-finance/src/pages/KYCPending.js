import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { HomeHeader } from '../components/Headers';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../redux/actions';

import { useTimeLeft } from '../hooks';
import KycPending from '../containers/KYC/KycPending';

export default () => {
  const dispatch = useDispatch();

  const timeLeft = useTimeLeft('2020-12-03T14:00:00.000+00:00');
  if (timeLeft) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    document.title = 'Union Finance | Document & ID status';
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
      <KycPending steps={3} />
    </>
  );
};
