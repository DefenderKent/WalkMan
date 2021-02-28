import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profile from '../profile/reducers';
import {auth} from '../auth/reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitlist: ['profile'],
};
const rootReducer = combineReducers({
  auth,
  profile,
});
export default persistReducer(persistConfig, rootReducer);
