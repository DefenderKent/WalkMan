import {restoreToken, setGeolocation} from './actions';

export type authAction =
  | ReturnType<typeof setGeolocation>
  | ReturnType<typeof restoreToken>;

export interface ICoordinates {
  latitude: number;
  longitude: number;
}
export type authReducer = {
  isLoading: boolean;
  userToken: null | string;
  coordinates: ICoordinates | null;
};
