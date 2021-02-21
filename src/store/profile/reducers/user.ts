import {Reducer} from 'redux';
import {profileAction, userReducer} from '../types';

const initialState = {
  user: {
    id: 0,
    typeAcc: '',
    name: '',
    email: '',
    address: '',
    location: '',
  },
  isLoading: false,
};

export const user: Reducer<userReducer, profileAction> = (
  state = initialState,
  action: profileAction,
) => {
  switch (action.type) {
    case 'RECEIVE_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'RECEIVE_USER_TYPE':
      return {
        ...state,
        user: {
          ...state.user,
          type: action.typeAcc,
        },
      };
    case 'USER_IS_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
};
