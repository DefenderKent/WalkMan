import {Account, AccountUser} from '../types';
import {
  receiveUser,
  userIsLoading,
  myHistory,
  delHistory,
  exportHistory,
  setName,
} from './actions/user';
import {receiveFriend, friendIsLoading, importHistory} from './actions/friend';

export type profileAction =
  | ReturnType<typeof receiveUser>
  | ReturnType<typeof setName>
  | ReturnType<typeof myHistory>
  | ReturnType<typeof exportHistory>
  | ReturnType<typeof importHistory>
  | ReturnType<typeof delHistory>
  | ReturnType<typeof receiveFriend>
  | ReturnType<typeof friendIsLoading>
  | ReturnType<typeof userIsLoading>;

export type userReducer = {
  user: AccountUser;
  isLoading: boolean;
};
export type friendReducer = {
  profile: Account;
  isLoading: boolean;
};
