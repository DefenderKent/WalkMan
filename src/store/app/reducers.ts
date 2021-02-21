import {combineReducers} from 'redux';

import profile from '../profile/reducers';
import {auth} from '../auth/reducers';
export const appReducers = combineReducers({
  auth,
  profile,
});
