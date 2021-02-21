import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {IRootRoute, RootStackParamList} from '../../navigation/interfaces';
import {NavigationPages} from '../../navigation/pages';
import {fetchUser} from '../../store/profile/actions';
import {RootState} from '../../store/types';
import {styles} from './style';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: IRootRoute<NavigationPages.home>;
}
export const HomeScreen: React.FC<IProps> = ({route}) => {
  const dispatch = useDispatch();
  const {user} = useSelector((store: RootState) => store.profile.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Text>HomeScreen</Text>
        <Text>{user.name}</Text>
      </View>
    </SafeAreaView>
  );
};
