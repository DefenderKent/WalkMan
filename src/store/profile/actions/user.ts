import {Alert} from 'react-native';

import {Account, AppThunk, IMyHistory} from '../../types';

export function receiveUser(user: Account) {
  return <const>{
    type: 'RECEIVE_USER',
    user,
  };
}
export const myHistory = (history: IMyHistory) =>
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
        history: [
          {
            waypoints: [{coordinates: [0]}],
            profile: 'driving-traffic',
            geometries: 'geojson',
          },
        ],
      }),
    );
  } catch (error) {
    Alert.alert(error);
  }
  dispatch(userIsLoading(false));
};
