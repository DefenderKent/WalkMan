/* eslint-disable react/no-children-prop */
import React from 'react';

import {NavigationPages} from '../pages';
import {Stack} from '../AppContainer';
import {TabNavigator} from '../TabNavigator';

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: '#fff'},
        header: () => null,
      }}>
      <Stack.Screen name={NavigationPages.home} component={TabNavigator} />
    </Stack.Navigator>
  );
};
