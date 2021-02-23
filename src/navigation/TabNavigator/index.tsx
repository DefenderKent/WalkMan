/* eslint-disable react/display-name */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {HistoryScreen, HomeScreen, ProfileScreen} from '../../screens';
import {TabPages} from '../pages';

import {Colors} from '../../style';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator tabBarOptions={{style: {backgroundColor: Colors.lightGrey}}}>
      <Tab.Screen
        component={HomeScreen}
        name={TabPages.tabHome}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name="md-home" color={Colors.aqua} size={25} />
            ) : (
              <Icon name="md-home-outline" color={Colors.aqua} size={25} />
            ),
        }}
      />
      <Tab.Screen
        component={HistoryScreen}
        name={TabPages.historyTab}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons name="history" color={Colors.aqua} size={25} />
          ),
        }}
      />
      <Tab.Screen
        component={ProfileScreen}
        name={TabPages.profileTab}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialIcons name="person" color={Colors.aqua} size={25} />
            ) : (
              <MaterialIcons
                name="person-outline"
                color={Colors.aqua}
                size={25}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
