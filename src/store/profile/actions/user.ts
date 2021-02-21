import {Alert} from 'react-native';

import {Account, AppThunk} from '../../types';

export function receiveUser(user: Account) {
  return <const>{
    type: 'RECEIVE_USER',
    user,
  };
}
export function receiveUserType(typeAcc: string) {
  return <const>{
    type: 'RECEIVE_USER_TYPE',
    typeAcc,
  };
}
export function userIsLoading(isLoading: boolean) {
  return <const>{
    type: 'USER_IS_LOADING',
    isLoading,
  };
}

export const fetchUser = (): AppThunk => async (dispatch) => {
  dispatch(userIsLoading(true));
  try {
    // const data = await console.log("test1");
    dispatch(
      receiveUser({
        id: 1,
        typeAcc: 'client',
        name: 'Bob',
        email: 'bob@mqail.ru',
        address: 'testandress',
        location: '1234',
      }),
    );
  } catch (error) {
    Alert.alert(error);
  }
  dispatch(userIsLoading(false));
};
