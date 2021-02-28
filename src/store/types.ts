import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import appReducers from './app/reducers';

export type RootState = ReturnType<typeof appReducers>;
export interface IAction {
  type: string;
  payload: any;
}
export interface Icoordinates {
  coordinates: number[];
}

export interface Account {
  id: number;
  typeAcc: string;
  name: string;
  email: string;
  address: string;
  history: Array<IAdress>;
}
export interface ILocation {
  latitude: number;
  longitude: number;
}
export interface IAdress {
  name: string;
  history: ILocation[];
}
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
