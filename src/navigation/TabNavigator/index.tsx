/* eslint-disable react/display-name */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {HistoryScreen, HomeScreen, ProfileScreen} from '../../screens';
import {TabPages} from '../pages';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen component={HomeScreen} name={TabPages.tabHome} />
      <Tab.Screen component={HistoryScreen} name={TabPages.historyTab} />
      <Tab.Screen component={ProfileScreen} name={TabPages.profileTab} />
    </Tab.Navigator>
  );
};
