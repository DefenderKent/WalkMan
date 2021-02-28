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
import {PermissionsAndroid} from 'react-native';
import {Provider} from 'react-redux';
import {AppContainer} from './src/navigation/AppContainer';
import Geolocation from 'react-native-geolocation-service';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';

import {persistor, store} from './src/store';
import {setGeolocation} from './src/store/auth/actions';
import {fetchFriend} from './src/store/profile/actions/friend';
import {setName} from './src/store/profile/actions/user';

export const App: React.FC = () => {
  const [getPermission, setPermission] = useState(false);

  const hasPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermission(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    hasPermission();
    store.dispatch(fetchFriend());
    store.dispatch(setName('Tomy'));

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
    } else {
      hasPermission();
    }
  }, [getPermission]);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </SafeAreaProvider>
    </Provider>
  );
};
