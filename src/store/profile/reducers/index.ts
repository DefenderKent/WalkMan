import {combineReducers} from 'redux';

import {user} from './user';
import {friend} from './friend';

export default combineReducers({
  user,
  friend,
});
