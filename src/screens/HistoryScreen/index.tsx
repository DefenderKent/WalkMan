import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {SafeAreaView, View, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {Button, EmptyList, Header, RenderItem} from '../../components';
import {textApp} from '../../constants';
import {IRootRoute, RootStackParamList} from '../../navigation/interfaces';
import {NavigationPages} from '../../navigation/pages';
import {delHistory} from '../../store/profile/actions';
import {RootState} from '../../store/types';
import {COMMON_STYLES} from '../../style';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: IRootRoute<NavigationPages.home>;
}
export const HistoryScreen: React.FC<IProps> = ({route}) => {
  const history = useSelector(
    (state: RootState) => state.profile.user.user.history,
  );
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {}, [history]);

  return (
    <SafeAreaView
      style={[COMMON_STYLES.componentContainer, COMMON_STYLES.screenContainer]}>
      <Header title={textApp.history} />
      {history.length ? (
        <View>
          <FlatList
            keyExtractor={(item, index) => `history-${item.name}-${index}`}
            data={history}
            renderItem={({item, index}) => {
              return (
                <View style={COMMON_STYLES.renderItem}>
                  <RenderItem
                    item={item}
                    index={index}
                    onPress={() => navigate(NavigationPages.map, {item})}
                  />

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
        <EmptyList />
      )}
    </SafeAreaView>
  );
};
