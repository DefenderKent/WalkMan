import React from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';

import {styles} from './style';
import {navigationRef} from '../../navigation/NavigationService';
import {Colors} from '../../style';
import {IRootRoute, RootStackParamList} from '../../navigation/interfaces';
import {NavigationPages} from '../../navigation/pages';
import {Header} from '../../components';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: IRootRoute<NavigationPages.modal>;
}

export const ModalFormScreen: React.FC<IProps> = ({route}) => {
  const {Body, title} = route.params;
  return (
    <>
      <Header goBack />
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => navigationRef.current?.goBack()}>
          <View style={styles.innerContainer}></View>
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.close}
              onPress={() => navigationRef.current?.goBack()}>
              <Icon name="exit-outline" color={Colors.blueApp} size={25} />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View>{Body}</View>
        </View>
      </SafeAreaView>
    </>
  );
};
