import React from 'react';

import {View, Text, ImageBackground} from 'react-native';

import {styles} from './style';

export const EmptyList: React.FC = ({}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/back.jpg')}
        style={styles.image}>
        <Text style={styles.title}>Список пока пуст!</Text>
      </ImageBackground>
    </View>
  );
};
