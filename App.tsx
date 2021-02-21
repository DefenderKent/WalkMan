/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {AppContainer} from './src/navigation/AppContainer';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {IS_ANDROID} from './src/utils';
import {SafeAreaProvider} from 'react-native-safe-area-context';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiZGVmZW5kZXJrZW50IiwiYSI6ImNrbGY1aXZuaTB6ZG0ycXA3N3RleHZndWkifQ._YyjfG_JCtG_r9EcnxRhYA',
);
export const App: React.FC = () => {
  const [isFetchingAndroidPermission, setPermission] = useState(IS_ANDROID);
  const [isAndroidPermissionGranted, setisAndroidPermissionGranted] = useState(
    false,
  );
  const isGrantedFu = async () => {
    if (IS_ANDROID) {
      const isGranted = await MapboxGL.requestAndroidLocationPermissions();
      setisAndroidPermissionGranted(isGranted);
      setPermission(false);
    }
  };
  useEffect(() => {
    isGrantedFu();
  }, []);
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <SafeAreaProvider>
          <AppContainer />
        </SafeAreaProvider>
      </Provider>
    </>
  );
};
