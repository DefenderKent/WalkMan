import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {getAddressFromCoordinates} from '../../../api';
import {storageKeys} from '../../../constants';

import {Account, AppThunk, ILocation} from '../../types';

export function receiveUser(user: Account) {
  return <const>{
    type: 'RECEIVE_USER',
    user,
  };
}
export const myHistory = (history: ILocation[]) =>
  <const>{
    type: 'UPDATE_MY_HISTORY',
    history,
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
        history: [[{latitude: 0, longitude: 0}]],
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
  try {
    const res = await getAddressFromCoordinates(history[0]);
    const data = await res.json();
    console.log('data', data.Response.View[0].Result[0].Location.Address.Label);

    dispatch(myHistory(history));
  } catch (error) {
    Alert.alert('addMyHistory', error.message);
  }
};
