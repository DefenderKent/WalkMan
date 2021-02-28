import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {getAddressFromCoordinates} from '../../../api';
import {storageKeys, testRoute, textApp} from '../../../constants';
import {showLongToast} from '../../../utils/showLongToast';

import {Account, AppThunk, IAdress, ILocation} from '../../types';

export function receiveFriend(profile: Account) {
  return <const>{
    type: 'RECEIVE_FRIEND',
    profile,
  };
}
export const importHistory = (history: IAdress) =>
  <const>{
    type: 'IMPORT_HISTORY',
    history,
  };
export function friendIsLoading(isLoading: boolean) {
  return <const>{
    type: 'FRIEND_IS_LOADING',
    isLoading,
  };
}
export const fetchFriend = (): AppThunk => async (dispatch) => {
  dispatch(friendIsLoading(true));
  try {
    dispatch(
      receiveFriend({
        id: 1,
        typeAcc: 'client',
        name: 'Friend Bob',
        email: 'bob@mqail.ru',
        address: 'testandress',
        history: [
          {
            name: 'улица Кузнечный Взвоз 10, Томск, Россия, 634003',
            history: testRoute,
          },
          {name: 'TestAdress 1/2', history: testRoute},
        ],
      }),
    );
  } catch (error) {
    Alert.alert(error);
  }
  dispatch(friendIsLoading(false));
};

export const addImportHistory = (history: any): AppThunk => async (
  dispatch,
) => {
  dispatch(friendIsLoading(true));
  try {
    dispatch(importHistory(history));
    showLongToast(textApp.successImport);
  } catch (error) {
    Alert.alert('addMyHistory', error.message);
    showLongToast(textApp.errorImport);
  }
  dispatch(friendIsLoading(false));
};
