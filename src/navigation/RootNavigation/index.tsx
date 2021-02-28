/* eslint-disable react/no-children-prop */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParamList} from '../interfaces';
import {NavigationPages} from '../pages';
import {MapScreen} from '../../screens';
import {Stack} from '../AppContainer';

interface IProps {}

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={NavigationPages.home} component={MapScreen} />
    </Stack.Navigator>
  );
};
