import {
  SALE_CHECKOUT_SET_LOCK_TIME,
  SALE_CHECKOUT_SET_LOCK_TX_HASH,
  SALE_CHECKOUT_SET_UNN_TOKEN_AMOUNT,
  SALE_CHECKOUT_SET_PURCHASE_TX_HASH,
} from './actionTypes';

//
export const setSaleCheckoutUNNTokenAmount = (amount) => {
  return {
    type: SALE_CHECKOUT_SET_UNN_TOKEN_AMOUNT,
    payload: {
      amount,
    },
  };
};

export const setSaleCheckoutLockTime = (time) => {
  return {
    type: SALE_CHECKOUT_SET_LOCK_TIME,
    payload: {
      time,
    },
  };
};

export const setSaleCheckoutLockTx = (txHash) => {
  return {
    type: SALE_CHECKOUT_SET_LOCK_TX_HASH,
    payload: {
      txHash,
    },
  };
};

//
export const setSaleCheckoutPurchaseTx = (txHash) => {
  return {
    type: SALE_CHECKOUT_SET_PURCHASE_TX_HASH,
    payload: {
      txHash,
    },
  };
};
