import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {MapScreen, ProfileScreen} from '../../screens';

import {NavigationPages} from '../pages';

const Stack = createStackNavigator();

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: '#fff'},
        header: () => null,
        headerTitle: 'AboutScreen',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name={NavigationPages.profileScreen}
        component={ProfileScreen}
      />

      <Stack.Screen name={NavigationPages.map} component={MapScreen} />
    </Stack.Navigator>
  );
};
