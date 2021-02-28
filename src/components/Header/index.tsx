import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import {DrawerActions} from '@react-navigation/native';

import {styles} from './style';
import {GoBack} from './GoBack';
import {navigationRef} from '../../navigation/NavigationService';
import {Colors} from '../../style/colors';

interface Header {
  goBack?: boolean;
  title?: string;
  sortingPrefix?: string;
  type?: string;
  search?: boolean;
  menu?: boolean;
  onMapButtonPress?: () => void;
  mapMode?: boolean;
}

export const Header: React.FC<Header> = ({goBack, title, menu = false}) => {
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={[styles.wrapper, menu && {paddingHorizontal: 16}]}>
            {menu ? (
              <Pressable
                onPress={() =>
                  navigationRef.current?.dispatch(DrawerActions.openDrawer())
                }>
                <MaterialCommunityIcons
                  name="person-outline"
                  size={24}
                  color={Colors.blueApp}
                />
              </Pressable>
            ) : (
              <View style={{width: 40, height: 40}}>
                {goBack && <GoBack />}
              </View>
            )}

            {Boolean(title) ? (
              <Text style={styles.customTitle}>{title}</Text>
            ) : (
              <Text style={styles.title}>WalkMan</Text>
            )}
            <View style={{width: 40, height: 40}} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
