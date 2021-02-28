import {createStore, applyMiddleware, Action} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
//test
import appReducers from './app/reducers';
import {RootState} from './types';

export const rootReducer = () => {
  return (state: RootState | undefined, action: Action) => {
    if (action.type === 'RESET_STATE') {
      state = undefined;
    }
    return appReducers(state, action);
  };
};

export const resetState = () =>
  <const>{
    type: 'RESET_STATE',
  };

export const store = createStore(
  rootReducer(),
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);
export const persistor = persistStore(store);

export default {store, persistor};
