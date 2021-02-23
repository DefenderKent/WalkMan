import React from 'react';
import {Pressable, View, Text} from 'react-native';

import {Colors} from '../../style';

import {styles} from './style';
interface ShareButtonProps {
  title: string;
  Icon: React.ReactElement;
  onPress: () => void;
}

export const Button: React.FC<ShareButtonProps> = ({Icon, title, onPress}) => {
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
