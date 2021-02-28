import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {HistoryScreen, MapScreen} from '../../screens';

import {NavigationPages} from '../pages';
const Stack = createStackNavigator();

export const HistoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: '#fff'},
        header: () => null,
        headerTitle: 'AboutScreen',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name={NavigationPages.historyScreen}
        component={HistoryScreen}
      />
      <Stack.Screen name={NavigationPages.map} component={MapScreen} />
    </Stack.Navigator>
  );
};
