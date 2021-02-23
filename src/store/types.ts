import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {appReducers} from './app/reducers';

export type RootState = ReturnType<typeof appReducers>;
export interface IAction {
  type: string;
  payload: any;
}
export interface Icoordinates {
  coordinates: number[];
}
export interface IMyHistory {
  waypoints: Icoordinates[];
  profile: string;
  geometries: string;
}
export interface Account {
  id: number;
  typeAcc: string;
  name: string;
  email: string;
  address: string;
  history: IMyHistory[];
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
