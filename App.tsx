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
import {PermissionsAndroid, StatusBar} from 'react-native';
import {Provider, useDispatch} from 'react-redux';
import {AppContainer} from './src/navigation/AppContainer';
import Geolocation from 'react-native-geolocation-service';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';

import {persistor, store} from './src/store';
import {setGeolocation} from './src/store/auth/actions';

export const App: React.FC = () => {
  const [getPermission, setPermission] = useState(false);

  const hasPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermission(true);
      } else {
        //добавить акшен и потом вывести кнопку с зпросом на местоположение.
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // setGeolocation({
  //   latitude: position.coords.latitude,
  //   longitude: position.coords.longitude,
  // })
  useEffect(() => {
    hasPermission();
    if (getPermission) {
      return Geolocation.getCurrentPosition(
        (position) => {
          store.dispatch(
            setGeolocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          );
        },
        (error) => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [getPermission, store.getState().auth.coordinates]);
  return (
    <Provider store={store}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <SafeAreaProvider>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </SafeAreaProvider>
    </Provider>
  );
};
