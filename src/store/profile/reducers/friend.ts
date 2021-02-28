import {Reducer} from 'redux';
import {friendReducer, profileAction, userReducer} from '../types';

const initialState = {
  profile: {
    id: 0,
    typeAcc: '',
    name: '',
    email: '',
    address: '',
    history: [],
  },
  isLoading: false,
};

export const friend: Reducer<friendReducer, profileAction> = (
  state = initialState,
  action: profileAction,
) => {
  switch (action.type) {
    case 'RECEIVE_FRIEND':
      return {
        ...state,
        profile: action.profile,
      };
    case 'IMPORT_HISTORY':
      return {
        ...state,
        profile: {
          ...state.profile,
          history: [...state.profile.history, action.history],
        },
      };
    case 'FRIEND_IS_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
};
