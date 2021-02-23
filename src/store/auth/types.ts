import {restoreToken, setGeolocation} from './actions';

export type authAction =
  | ReturnType<typeof setGeolocation>
  | ReturnType<typeof restoreToken>;

export type authReducer = {
  isLoading: boolean;
  userToken: null | string;
  coordinates: number[];
};
