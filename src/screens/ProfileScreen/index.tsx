import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, View, Text, FlatList, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {IRootRoute, RootStackParamList} from '../../navigation/interfaces';
import {NavigationPages} from '../../navigation/pages';
import {RootState} from '../../store/types';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: IRootRoute<NavigationPages.home>;
}
export const ProfileScreen: React.FC<IProps> = ({route}) => {
  const {name, exportHistory} = useSelector(
    (state: RootState) => state.profile.user.user,
  );
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  console.log('exportHistory', exportHistory);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Text>Имя:{name}</Text>
      </View>
      <View>
        <Text>Сохраненные маршруты</Text>
        {exportHistory.length ? (
          <View>
            <FlatList
              keyExtractor={(item, index) => `history-${item.name}-${index}`}
              data={exportHistory}
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
                  </View>
                );
              }}
            />
          </View>
        ) : (
          <Text>Empty</Text>
        )}
      </View>
    </SafeAreaView>
  );
};
