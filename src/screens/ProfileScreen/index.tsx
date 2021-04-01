import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, View, Text, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

import {AvatarBody, Header, RenderItem} from '../../components';
import {textApp} from '../../constants';
import {NavigationPages} from '../../navigation/pages';
import {RootState} from '../../store/types';
import {Colors, COMMON_STYLES} from '../../style';

export const ProfileScreen: React.FC = ({}) => {
  const {name, exportHistory} = useSelector(
    (state: RootState) => state.profile.user.user,
  );
  const {navigate} = useNavigation();
  return (
    <SafeAreaView
      style={[COMMON_STYLES.componentContainer, COMMON_STYLES.screenContainer]}>
      <Header title={textApp.profile} />
      <AvatarBody
        name={name}
        Icon={<MaterialIcons name="person" color={Colors.blueApp} size={64} />}
      />
      <View>
        <Text style={[COMMON_STYLES.sybTitle, {marginBottom: 8}]}>
          {textApp.saveRoute}
        </Text>
        {exportHistory.length ? (
          <FlatList
            keyExtractor={(item, index) => `history-${item.name}-${index}`}
            data={exportHistory}
            renderItem={({item, index}) => {
              return (
                <View style={COMMON_STYLES.renderItem}>
                  <RenderItem
                    item={item}
                    index={index}
                    onPress={() => navigate(NavigationPages.map, {item})}
                  />
                </View>
              );
            }}
          />
        ) : (
          <Text style={{textAlign: 'center', fontSize: 20}}>
            Список пока пуст!
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};
