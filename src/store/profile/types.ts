import {Account} from '../types';
import {receiveUser, receiveUserType, userIsLoading} from './actions/user';

export type profileAction =
  | ReturnType<typeof receiveUser>
  | ReturnType<typeof userIsLoading>
  | ReturnType<typeof receiveUserType>;

export type userReducer = {
  user: Account;
  isLoading: boolean;
};
