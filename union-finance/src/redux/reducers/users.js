import {
  UPDATE_USER_ADDRESS,
  UPDATE_USER_DOCUMENT_INFO,
  UPDATE_USER_FUNDS,
  UPDATE_USER_PERSONAL_INFO,
  AWAIT_USER_INFO,
  DONE_USER_INFO,
  UPDATE_USER_IDENTITY,
  UPDATE_USER_INFO,
  UPDATE_ALL_USER_INFO,
  AWAIT_SYNAPS_INFO,
  DONE_SYNAPS_INFO,
  PRECHECK_DONE,
  FINISHED_VERIFICATION,
  INIT_STATE,
  UPDATE_USER_ETH,
} from '../actions/actionTypes';

const initialState = {
  fetching: true,
  synaps: true,
  precheck: false,
  finish_verification: false,
  uuid: '',
  eth_address: '',
  phone: '',
  email: '',
  identity: {},
  address: {},
  document: {},
  funds: {},
};

export default (state = initialState, action) => {
  const { data } = action;
  switch (action.type) {
    case AWAIT_SYNAPS_INFO:
      return {
        ...state,
        synaps: true,
      };
    case DONE_SYNAPS_INFO:
      return {
        ...state,
        synaps: false,
      };
    case AWAIT_USER_INFO:
      return {
        ...state,
        fetching: true,
      };
    case DONE_USER_INFO:
      return {
        ...state,
        fetching: false,
      };
    case PRECHECK_DONE:
      return {
        ...state,
        precheck: true,
      };
    case FINISHED_VERIFICATION:
      return {
        ...state,
        finish_verification: true,
      };
    case UPDATE_ALL_USER_INFO:
      return {
        ...state,
        ...data,
      };
    case UPDATE_USER_INFO:
      return {
        ...state,
        [data.type]: data.value,
      };
    case UPDATE_USER_IDENTITY:
      return {
        ...state,
        identity: {
          ...state.identity,
          [data.type]: data.value,
        },
      };
    case UPDATE_USER_PERSONAL_INFO:
      return {
        ...state,
        uuid: data.uuid,
        phone: data.phone,
        email: data.email,
        eth_address: data.eth_address,
        identity: data.identity,
      };
    case UPDATE_USER_ADDRESS:
      return {
        ...state,
        address: data,
      };
    case UPDATE_USER_DOCUMENT_INFO:
      return {
        ...state,
        document: data,
        synaps: false,
      };
    case UPDATE_USER_FUNDS:
      return {
        ...state,
        funds: data,
      };
    case UPDATE_USER_ETH:
      return {
        ...initialState,
        eth_address: data,
      };
    case INIT_STATE: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};
