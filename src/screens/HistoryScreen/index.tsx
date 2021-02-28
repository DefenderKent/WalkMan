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
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '../../components';
import {storageKeys} from '../../constants/storageKeys';

import {IRootRoute, RootStackParamList} from '../../navigation/interfaces';
import {NavigationPages} from '../../navigation/pages';
import {delHistory} from '../../store/profile/actions';
import {RootState} from '../../store/types';
import {styles} from './style';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: IRootRoute<NavigationPages.home>;
}
export const HistoryScreen: React.FC<IProps> = ({route}) => {
  const resetHistory = async () => {
    try {
      console.log('22');
    } catch (error) {
      Alert.alert('t.error', error.message);
    }
  };
  const history = useSelector(
    (state: RootState) => state.profile.user.user.history,
  );
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    // getData();
  }, [history]);
  console.log('history', history);

  return (
    <SafeAreaView style={{flex: 1}}>
      {history.length ? (
        <View>
          <FlatList
            keyExtractor={(item, index) => `history-${item.name}-${index}`}
            data={history}
            renderItem={({item, index}) => {
              return (
                <View>
                  <Pressable
                    onPress={() => {
                      navigate(NavigationPages.map, {item});
                    }}
                    key={index}>
                    <Text>{`Маршрут №${index + 1}`}</Text>
                    <View>
                      <View>
                        <Text>Название</Text>
                        <Text>{item.name}</Text>
                      </View>
                    </View>
                  </Pressable>
                  <Button
                    title="Удалить"
                    onPress={() => {
                      dispatch(delHistory(index));
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      ) : (
        <Text>Empty</Text>
      )}
    </SafeAreaView>
  );
};
