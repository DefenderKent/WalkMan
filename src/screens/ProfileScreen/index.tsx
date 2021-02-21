import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import {IRootRoute, RootStackParamList} from '../../navigation/interfaces';
import {NavigationPages} from '../../navigation/pages';
import {styles} from './style';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: IRootRoute<NavigationPages.home>;
}
export const ProfileScreen: React.FC<IProps> = ({route}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Text>ProfileScreen</Text>
      </View>
    </SafeAreaView>
  );
};
