import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, View, Text, FlatList, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Modal} from '../../components';

import {IRootRoute, RootStackParamList} from '../../navigation/interfaces';
import {NavigationPages} from '../../navigation/pages';
import {addImportHistory} from '../../store/profile/actions/friend';
import {addExportHistory} from '../../store/profile/actions/user';
import {RootState} from '../../store/types';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: IRootRoute<NavigationPages.friendScreen>;
}
export const FriendScreen: React.FC<IProps> = ({route}) => {
  const {name, history} = useSelector(
    (state: RootState) => state.profile.friend.profile,
  );
  const myHistory = useSelector(
    (state: RootState) => state.profile.user.user.history,
  );
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Text>имя {name}</Text>
      </View>

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
                title={'Экспортировать маршрут'}
                onPress={() => {
                  dispatch(
                    addExportHistory({
                      owner: name,
                      name: item.name,
                      history: item.history,
                    }),
                  );
                }}
              />
            </View>
          );
        }}
      />
      <View>
        <Button
          title={'Отправить свой маршрут'}
          onPress={() => {
            navigate(NavigationPages.modal, {
              Body: (
                <Modal
                  myHistory={myHistory}
                  onPress={() => console.log('12')}
                />
              ),
              title: 'Выберете маршрут',
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};
