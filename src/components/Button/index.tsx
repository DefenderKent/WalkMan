import React from 'react';
import {Pressable, View, Text} from 'react-native';

import {styles} from './style';
interface ButtonProps {
  title?: string;
  Icon?: React.ReactElement;
  onPress: () => void;
  small?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  Icon,
  title,
  onPress,
  small,
}) => {
  return (
    <Pressable style={{alignItems: 'center'}} onPress={onPress}>
      {({pressed}) => (
        <>
          <View style={[styles.container, small && {width: 180, height: 40}]}>
            {Icon}
            <Text style={styles.title}>{title}</Text>
          </View>
        </>
      )}
    </Pressable>
  );
};
