import React from 'react';
import {Pressable, View, Text} from 'react-native';

import {styles} from './style';
interface ButtonProps {
  title?: string;
  Icon?: React.ReactElement;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({Icon, title, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      {({pressed}) => (
        <>
          <View style={styles.container}>
            {Icon}
            <Text style={styles.title}>{title}</Text>
          </View>
        </>
      )}
    </Pressable>
  );
};
