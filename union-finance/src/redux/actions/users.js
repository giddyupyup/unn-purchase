import {
  UPDATE_USER_ADDRESS,
  UPDATE_USER_DOCUMENT_INFO,
  UPDATE_USER_FUNDS,
  UPDATE_USER_PERSONAL_INFO,
  AWAIT_USER_INFO,
  DONE_USER_INFO,
  UPDATE_USER_IDENTITY,
  UPDATE_USER_INFO,
  AWAIT_SYNAPS_INFO,
  DONE_SYNAPS_INFO,
  UPDATE_ALL_USER_INFO,
  PRECHECK_DONE,
  FINISHED_VERIFICATION,
  INIT_STATE,
  UPDATE_USER_ETH,
} from './actionTypes';
import API from '../../services/API';

export const awaitUserInfo = () => {
  return {
    type: AWAIT_USER_INFO,
  };
};

export const doneUserInfo = () => {
  return {
    type: DONE_USER_INFO,
  };
};

export const precheckDone = () => {
  return {
    type: PRECHECK_DONE,
  };
};

export const finishVerification = () => {
  return {
    type: FINISHED_VERIFICATION,
  };
};

export const getUserInfo = () => {
  return async (dispatch) => {
    dispatch(awaitUserInfo());
    const uuid = localStorage.getItem('user_uuid');

    if (!uuid) {
      dispatch(doneUserInfo());
    } else {
      try {
        const response = await API.get(`/users/uuid/${uuid}`);
        const { user, identity, address, document, funds } = response.data.data;

        let data = {
          fetching: false,
          uuid: user.uuid,
          email: user.email,
          phone: user.phone,
          eth_address: user.eth_address,
        };

        if (identity)
          data = {
            ...data,
            identity: {
              firstName: identity.first_name,
              middleName: identity.middle_name,
              lastName: identity.last_name,
              birthdate: identity.birthdate,
              nationality: identity.nationality,
              countryCode: identity.country_code,
              occupation: identity.occupation,
            },
          };

        if (address)
          data = {
            ...data,
            address: {
              address_1: address.address_1,
              address_2: address.address_2 || '',
              city: address.city,
              country: address.country,
              zipCode: address.zipcode,
              state: address.state || '',
            },
          };

        if (document)
          data = {
            ...data,
            document: {
              session_id: document.session_id,
            },
            finish_verification: document.finish_verification,
            synaps: false,
          };

        if (funds)
          data = {
            ...data,
            funds: {
              contribution: funds.contribution,
              source: funds.source,
            },
            precheck: true,
          };

        dispatch(updateAllUserInfo(data));
      } catch (error) {
        dispatch(doneUserInfo());
      }
    }
  };
};

export const generateSynapseSessionId = (uuid) => {
  return async (dispatch) => {
    dispatch({ type: AWAIT_SYNAPS_INFO });
    // const uuid = localStorage.getItem('user_uuid');
    try {
      const docs = await API.post('/users/document', { uuid });
      dispatch(
        updateUserDocumentInfo({
          session_id: docs.data.data.session_id,
        }),
      );
    } catch (error) {
      dispatch({ type: DONE_SYNAPS_INFO });
    }
  };
};

export const updateAllUserInfo = (info) => {
  return {
    type: UPDATE_ALL_USER_INFO,
    data: info,
  };
};

export const updateUserInfo = (user) => {
  return {
    type: UPDATE_USER_INFO,
    data: user,
  };
};

export const updateUserIdentity = (identity) => {
  return {
    type: UPDATE_USER_IDENTITY,
    data: identity,
  };
};

export const updateUserPersonalInfo = (personalInfo) => {
  return {
    type: UPDATE_USER_PERSONAL_INFO,
    data: personalInfo,
  };
};

export const updateUserAddressInfo = (addressInfo) => {
  return {
    type: UPDATE_USER_ADDRESS,
    data: addressInfo,
  };
};

export const updateUserDocumentInfo = (documentInfo) => {
  return {
    type: UPDATE_USER_DOCUMENT_INFO,
    data: documentInfo,
  };
};

export const updateUserFund = (fundInfo) => {
  return {
    type: UPDATE_USER_FUNDS,
    data: fundInfo,
  };
};

export const updateUserEth = ( eth_address ) => {
  return {
    type: UPDATE_USER_ETH,
    data: eth_address
  }
}

export const resetUserState = () => {
  return {
    type: INIT_STATE,
  };
};
