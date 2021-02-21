import {PersonCard} from '../favorites/types';
import {signOut, signIn, restoreToken, typeUser, isAuth} from './actions';

export type authAction =
  | ReturnType<typeof signOut>
  | ReturnType<typeof signIn>
  | ReturnType<typeof typeUser>
  | ReturnType<typeof isAuth>
  | ReturnType<typeof restoreToken>;

export type authReducer = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: null | string;
  typeAccount: string;
  isAuth: boolean;
};
