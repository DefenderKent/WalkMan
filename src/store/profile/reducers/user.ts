import {Reducer} from 'redux';
import {profileAction, userReducer} from '../types';

const initialState = {
  user: {
    id: 0,
    typeAcc: '',
    name: '',
    email: '',
    address: '',
    history: [],
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
    case 'UPDATE_MY_HISTORY':
      return {
        ...state,
        user: {
          ...state.user,
          history: [...state.user.history, action.history],
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
