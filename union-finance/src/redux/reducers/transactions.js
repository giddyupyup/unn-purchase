import {
  SALE_CHECKOUT_SET_LOCK_TIME,
  SALE_CHECKOUT_SET_LOCK_TX_HASH,
  SALE_CHECKOUT_SET_UNN_TOKEN_AMOUNT,
  SALE_CHECKOUT_SET_PURCHASE_TX_HASH,
} from '../actions/actionTypes';

const initialState = {
  tokenAmount: 0,
  timeLock: 0,
  txLock: '',
  txPurchase: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    //
    case SALE_CHECKOUT_SET_UNN_TOKEN_AMOUNT: {
      const { amount } = action.payload;
      return {
        ...state,
        tokenAmount: amount,
      };
    }

    case SALE_CHECKOUT_SET_LOCK_TIME: {
      const { time } = action.payload;
      return {
        ...state,
        timeLock: time,
      };
    }

    //
    case SALE_CHECKOUT_SET_LOCK_TX_HASH: {
      const { txHash } = action.payload;
      return {
        ...state,
        txLock: txHash,
      };
    }

    //
    case SALE_CHECKOUT_SET_PURCHASE_TX_HASH: {
      const { txHash } = action.payload;
      return {
        ...state,
        txPurchase: txHash,
      };
    }

    //
    default:
      return state;
  }
};
