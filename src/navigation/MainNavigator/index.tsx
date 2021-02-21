/* eslint-disable react/no-children-prop */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParamList} from '../interfaces';
import {NavigationPages} from '../pages';
import {HomeScreen} from '../../screens';
import {Stack} from '../AppContainer';
import {TabNavigator} from '../TabNavigator';

interface IProps {}

export const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={NavigationPages.home} component={TabNavigator} />
    </Stack.Navigator>
  );
};
