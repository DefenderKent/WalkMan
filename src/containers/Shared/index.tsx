import React, {useState} from 'react';
import {Pressable, View, Text, Share} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {Button} from '../../components';
import {textApp} from '../../constants';
import {RootState} from '../../store/types';

import {Colors} from '../../style';

import {styles} from './style';
interface ButtonProps {}

export const Shared: React.FC<ButtonProps> = () => {
  const {name} = useSelector((state: RootState) => state.profile.user.user);
  const onShare = async () => {
    Share.share({
      title: `${name} – ${textApp.sharedTitle}`,
      message: 'https://www.google.ru/',
      url: 'https://www.google.ru/',
    });
  };
  return (
    <Button
      title={textApp.shared}
      Icon={
        <Icon
          name="ios-share-social-outline"
          color={Colors.blueApp}
          size={25}
        />
      }
      onPress={onShare}
    />
  );
};
