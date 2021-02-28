import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {getAddressFromCoordinates} from '../../../api';
import {storageKeys, textApp} from '../../../constants';
import {showLongToast} from '../../../utils/showLongToast';

import {
  AccountUser,
  AppThunk,
  IAdress,
  ILocation,
  ImportHistory,
} from '../../types';

export function receiveUser(user: AccountUser) {
  return <const>{
    type: 'RECEIVE_USER',
    user,
  };
}
export const setName = (name: string) =>
  <const>{
    type: 'SET_NAME',
    name,
  };
export const myHistory = (history: IAdress) =>
  <const>{
    type: 'UPDATE_MY_HISTORY',
    history,
  };
export const exportHistory = (history: ImportHistory) =>
  <const>{
    type: 'EXPORT_HISTORY',
    history,
  };

export const delHistory = (id: number) =>
  <const>{
    type: 'DEL_HISTORY',
    id,
  };
export function userIsLoading(isLoading: boolean) {
  return <const>{
    type: 'USER_IS_LOADING',
    isLoading,
  };
}
export const fetchUser = (): AppThunk => async (dispatch) => {
  dispatch(userIsLoading(true));
  try {
    dispatch(
      receiveUser({
        id: 1,
        typeAcc: 'client',
        name: 'Bob',
        email: 'bob@mqail.ru',
        address: 'testandress',
        exportHistory: [],
        history: [],
      }),
    );
  } catch (error) {
    Alert.alert(error);
  }
  dispatch(userIsLoading(false));
};

export const addMyHistory = (history: Array<ILocation>): AppThunk => async (
  dispatch,
) => {
  dispatch(userIsLoading(true));
  try {
    console.log('addMyhistory', history);

    const res = await getAddressFromCoordinates(history[0]);
    const data = await res.json();
    console.log('data', data.Response.View[0].Result[0].Location.Address.Label);

    dispatch(
      myHistory({
        name: data.Response.View[0].Result[0].Location.Address.Label,
        history,
      }),
    );
  } catch (error) {
    Alert.alert('addMyHistory', error.message);
  }
  dispatch(userIsLoading(false));
};
export const addExportHistory = (history: any): AppThunk => async (
  dispatch,
) => {
  dispatch(userIsLoading(true));
  try {
    dispatch(exportHistory(history));
    showLongToast(textApp.successfullyExported);
  } catch (error) {
    Alert.alert('addMyHistory', error.message);
    showLongToast(textApp.errorExported);
  }
  dispatch(userIsLoading(false));
};
