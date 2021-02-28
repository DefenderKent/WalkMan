import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {Button} from '../../components';
import {textApp} from '../../constants';
import {Colors} from '../../style';

interface StartTrekkingProps {
  setPlayMode: (toogle: boolean) => void;
}

export const StartTrekking: React.FC<StartTrekkingProps> = ({setPlayMode}) => {
  const startTrekking = () => {
    setPlayMode(true);
  };
  return (
    <Button
      title={textApp.startTrekking}
      Icon={
        <Icon name="play-circle-outline" color={Colors.blueApp} size={25} />
      }
      onPress={startTrekking}
    />
  );
};
