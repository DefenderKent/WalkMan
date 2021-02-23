import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {navigationRef} from '../NavigationService';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../interfaces';
import {RootNavigator} from '../RootNavigation';
import {MainNavigator} from '../MainNavigator';

export const Stack = createStackNavigator<RootStackParamList>();
export const AppContainer: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      {false ? <RootNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
};
