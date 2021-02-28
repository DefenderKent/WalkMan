import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Button} from '../../components';
import {storageKeys} from '../../constants/storageKeys';

import {IRootRoute, RootStackParamList} from '../../navigation/interfaces';
import {NavigationPages} from '../../navigation/pages';
import {RootState} from '../../store/types';
import {styles} from './style';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: IRootRoute<NavigationPages.home>;
}
export const HistoryScreen: React.FC<IProps> = ({route}) => {
  const resetHistory = async () => {
    try {
      await AsyncStorage.removeItem(storageKeys.myHistory);
    } catch (error) {
      Alert.alert('t.error', error.message);
    }
  };
  const [StoregeHistory, setHistory] = useState();
  const history = useSelector(
    (state: RootState) => state.profile.user.user.history,
  );
  // const historyR = ['asdasdasd', 'asdasdas'];

  const {navigate} = useNavigation();

  useEffect(() => {
    // getData();
  }, [history]);
  console.log('history', history);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Button title="dell" onPress={resetHistory} />
      <View>
        <FlatList
          keyExtractor={(item) => `history-${item.length}`}
          data={history}
          renderItem={({item, index}) => {
            return (
              <Pressable
                onPress={() => {
                  console.log('1');
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
