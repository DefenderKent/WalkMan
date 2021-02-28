import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, View, Text, FlatList, Pressable} from 'react-native';
import {useSelector} from 'react-redux';

import {IRootRoute, RootStackParamList} from '../../navigation/interfaces';
import {NavigationPages} from '../../navigation/pages';
import {RootState} from '../../store/types';
import {styles} from './style';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: IRootRoute<NavigationPages.home>;
}
export const HistoryScreen: React.FC<IProps> = ({route}) => {
  const history = useSelector(
    (state: RootState) => state.profile.user.user.history,
  );
  // const historyR = ['asdasdasd', 'asdasdas'];
  console.log('historyR', history);
  const {navigate} = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <FlatList
          data={history}
          renderItem={({item, index}) => {
            console.log('item', item);
            return (
              <Pressable
                onPress={() => {
                  navigate(NavigationPages.map, {item});
                }}
                key={index}>
                <Text>{`Маршрут №${index + 1}`}</Text>
                <View>
                  <View>
                    <Text>Начало</Text>
                    <Text>latitude: {item[0].latitude}</Text>
                    <Text>longitude: {item[0].longitude}</Text>
                  </View>
                  <View>
                    <Text>конец</Text>
                    <Text>latitude: {item[item.length - 1].latitude}</Text>
                    <Text>longitude: {item[item.length - 1].longitude}</Text>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
