import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, View, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {AvatarBody, Button, Header, Modal, RenderItem} from '../../components';
import {textApp} from '../../constants';
import {IRootRoute, RootStackParamList} from '../../navigation/interfaces';
import {NavigationPages} from '../../navigation/pages';
import {addExportHistory} from '../../store/profile/actions/user';
import {RootState} from '../../store/types';
import {Colors} from '../../style';
import {COMMON_STYLES} from '../../style/globalStyles';

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
    <SafeAreaView
      style={[COMMON_STYLES.componentContainer, COMMON_STYLES.screenContainer]}>
      <Header title={textApp.friends} />

      <AvatarBody
        Icon={<MaterialIcons name="person" color={Colors.blueApp} size={64} />}
        name={name}
      />
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
                title={textApp.exportedRouter}
                Icon={
                  <Icon
                    name="ios-save-outline"
                    color={Colors.blueApp}
                    size={25}
                  />
                }
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
          Icon={
            <Icon
              name="ios-share-social-outline"
              color={Colors.blueApp}
              size={25}
            />
          }
          title={textApp.sendRoute}
          onPress={() => {
            navigate(NavigationPages.modal, {
              Body: <Modal myHistory={myHistory} />,
              title: textApp.pickRoute,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};
