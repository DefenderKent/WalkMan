import React from 'react';
import {View, ActivityIndicator, ViewStyle} from 'react-native';
import {Colors} from '../../style';

import {styles} from './style';

interface Loading {
  style?: ViewStyle;
}
export const Loading: React.FC<Loading> = ({style}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator color={Colors.blueApp} />
    </View>
  );
};
