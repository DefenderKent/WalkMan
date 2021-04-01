import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {HistoryScreen, MapScreen, ModalFormScreen} from '../../screens';
import {FriendScreen} from '../../screens/FriendScreen';

import {NavigationPages} from '../pages';
const Stack = createStackNavigator();

export const FriendStack = () => {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        cardStyle: {backgroundColor: '#fff'},
        header: () => null,
      }}>
      <Stack.Screen
        name={NavigationPages.friendScreen}
        component={FriendScreen}
      />
      <Stack.Screen
        name={NavigationPages.modal}
        component={ModalFormScreen}
        options={{
          cardStyle: {backgroundColor: 'transparent'},
          headerShown: false,
        }}
      />
      <Stack.Screen name={NavigationPages.map} component={MapScreen} />
    </Stack.Navigator>
  );
};
