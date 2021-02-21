/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {AppContainer} from './src/navigation/AppContainer';

export const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <AppContainer />
      </Provider>
    </>
  );
};
