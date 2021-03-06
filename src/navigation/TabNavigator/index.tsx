/* eslint-disable react/display-name */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';

import {MapScreen} from '../../screens';
import {TabPages} from '../pages';
import {Colors} from '../../style';
import {HistoryStack} from '../HistoryStack';
import {FriendStack} from '../FriendStack';
import {ProfileStack} from '../ProfileStack';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator tabBarOptions={{style: {backgroundColor: Colors.lightGrey}}}>
      <Tab.Screen
        component={MapScreen}
        name={TabPages.tabHome}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name="md-home" color={Colors.blueApp} size={25} />
            ) : (
              <Icon name="md-home-outline" color={Colors.blueApp} size={25} />
            ),
        }}
      />
      <Tab.Screen
        component={HistoryStack}
        name={TabPages.historyTab}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons name="history" color={Colors.blueApp} size={25} />
          ),
        }}
      />
      <Tab.Screen
        component={FriendStack}
        name={TabPages.friendTab}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialIcons name="people" color={Colors.blueApp} size={25} />
            ) : (
              <MaterialIcons
                name="people-outline"
                color={Colors.blueApp}
                size={25}
              />
            ),
        }}
      />
      <Tab.Screen
        component={ProfileStack}
        name={TabPages.profileTab}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialIcons name="person" color={Colors.blueApp} size={25} />
            ) : (
              <MaterialIcons
                name="person-outline"
                color={Colors.blueApp}
                size={25}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
