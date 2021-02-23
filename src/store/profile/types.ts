import {Account} from '../types';
import {receiveUser, userIsLoading, myHistory} from './actions/user';

export type profileAction =
  | ReturnType<typeof receiveUser>
  | ReturnType<typeof myHistory>
  | ReturnType<typeof userIsLoading>;

export type userReducer = {
  user: Account;
  isLoading: boolean;
};
