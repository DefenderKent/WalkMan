import React from 'react';
import {View, Text} from 'react-native';
import {textApp} from '../../constants';

import {styles} from './style';
interface AvatarBodyProps {
  name?: string;
  Icon?: React.ReactElement;
}

export const AvatarBody: React.FC<AvatarBodyProps> = ({name, Icon}) => {
  return (
    <View style={styles.container}>
      <View>{Icon}</View>
      <View>
        <Text style={styles.title}>
          {textApp.nickname} {name}
        </Text>
      </View>
    </View>
  );
};
