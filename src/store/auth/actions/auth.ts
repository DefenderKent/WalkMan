import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {AppThunk} from '../../types';
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

// export const addMyCoordinates = (newQuery: any): AppThunk => async (
//   dispatch,
// ) => {
//   try {
//     console.log('newQuery', newQuery);

//     await AsyncStorage.setItem('@myCoordinates', JSON.stringify(newQuery));
//     dispatch(setGeolocation(newQuery));
//   } catch (error) {
//     Alert.alert('@myCoordinates', error.message);
//   }
// };
