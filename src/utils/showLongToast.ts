import {Platform, ToastAndroid, Alert} from 'react-native';

import {textApp} from '../constants/index';

export const showLongToast = (title: string, type = textApp.saveWay) => {
  Platform.OS == 'android'
    ? ToastAndroid.showWithGravityAndOffset(
        title,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        64,
      )
    : Alert.alert(type, title);
};
