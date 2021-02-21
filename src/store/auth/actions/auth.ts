import {receiveUser, userIsLoading} from '../../profile/actions/user';
import {AppThunk} from '../../types';

export const signIn = (token: string) =>
  <const>{
    type: 'SIGN_IN',
    token,
  };
export const typeUser = (typeAccount: string) =>
  <const>{
    type: 'ACCOUNT_TYPE',
    typeAccount,
  };
export const isAuth = (isAuth: boolean) =>
  <const>{
    type: 'IS_AUTH',
    isAuth,
  };
export const signOut = () =>
  <const>{
    type: 'SIGN_OUT',
  };

export const restoreToken = (token: string | null) =>
  <const>{
    type: 'RESTORE_TOKEN',
    token,
  };
