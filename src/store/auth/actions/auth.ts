import {ICoordinates} from '../types';

export const setGeolocation = (coordinates: ICoordinates) =>
  <const>{
    type: 'SET_COORDINATES',
    coordinates,
  };

export const restoreToken = (token: string | null) =>
  <const>{
    type: 'RESTORE_TOKEN',
    token,
  };
