import {Account} from '../types';
import {
  receiveUser,
  userIsLoading,
  myHistory,
  delHistory,
} from './actions/user';

export type profileAction =
  | ReturnType<typeof receiveUser>
  | ReturnType<typeof myHistory>
  | ReturnType<typeof delHistory>
  | ReturnType<typeof userIsLoading>;

export type userReducer = {
  user: Account;
  isLoading: boolean;
};
