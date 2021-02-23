import {Reducer} from 'redux';
import {authAction, authReducer} from '../types';

const initialState = {
  isLoading: true,
  userToken: null,
  coordinates: [],
};

export const auth: Reducer<authReducer, authAction> = (
  state = initialState,
  action: authAction,
) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'SET_COORDINATES':
      return {
        ...state,
        coordinates: action.coordinates,
        isLoading: false,
      };

    default:
      return state;
  }
};
