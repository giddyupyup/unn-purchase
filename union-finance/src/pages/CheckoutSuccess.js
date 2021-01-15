import React, { useEffect, useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useTimeLeft } from '../hooks';

import { HomeHeader } from '../components/Headers';
import { CheckoutSuccess } from '../containers/KYC/Checkout';

//
const CheckoutSuccessPage = () => {
  //

  useEffect(() => {
    document.title = 'Union Finance | Checkout Success';
  }, []);

  //
  const [ethereum, setEthereum] = useState(null);
  const [ethAddress, setEthAddress] = useState(undefined);

  const initEthAddress = useCallback(async () => {
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    if (accounts && Array.isArray(accounts)) {
      setEthAddress(accounts[0]);
    }
  }, [ethereum]);

  //
  useEffect(() => {
    const ethereum = window.ethereum;
    if (typeof window.ethereum !== 'undefined') {
      setEthereum(ethereum);
    }
  }, [ethereum]);

  useEffect(() => {
    if (ethereum && ethereum.selectedAddress) {
      setEthAddress(ethereum.selectedAddress);
    }
  }, [ethereum]);

  useEffect(() => {
    if (ethereum && ethereum.isMetaMask) {
      ethereum.on('accountsChanged', (accounts) => {
        if (accounts && Array.isArray(accounts)) {
          setEthAddress(accounts[0]);
        }
      });
    }
  });

  //
  const getEthAccount = async () => {
    if (ethereum && ethereum.isMetaMask) {
      initEthAddress();
    }
  };

  const timeLeft = useTimeLeft('2020-12-03T14:00:00.000+00:00');
  if (timeLeft) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <HomeHeader checkout address={ethAddress} getAccount={getEthAccount} />
      <CheckoutSuccess />
    </>
  );
};

export default CheckoutSuccessPage;
