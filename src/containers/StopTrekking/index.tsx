import React from 'react';
import Geolocation from 'react-native-geolocation-service';

import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from '../../components';
import {textApp} from '../../constants';
import {Colors} from '../../style';

interface StopTrekkingProps {
  setPlayMode: (toogle: boolean) => void;
  watchId: any;
}

export const StopTrekking: React.FC<StopTrekkingProps> = ({
  setPlayMode,
  watchId,
}) => {
  const startTrekking = async () => {
    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
    }
    setPlayMode(false);
  };
  return (
    <Button
      title={textApp.pause}
      Icon={<Icon name="pause-circle-outline" color={Colors.aqua} size={25} />}
      onPress={startTrekking}
    />
  );
};
