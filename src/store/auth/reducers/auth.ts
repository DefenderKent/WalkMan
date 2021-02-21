import {Reducer} from 'redux';
import {authAction, authReducer} from '../types';

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  typeAccount: '',
  isAuth: false,
};

export const auth: Reducer<authReducer, authAction> = (
  state = initialState,
  action: authAction,
) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'ACCOUNT_TYPE':
      return {
        ...state,
        typeAccount: action.typeAccount,
      };
    case 'IS_AUTH':
      return {
        ...state,
        isAuth: action.isAuth,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };

    default:
      return state;
  }
};
