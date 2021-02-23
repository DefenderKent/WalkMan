import React, {useState} from 'react';
import {Pressable, View, Text, Share} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '../../components';
import {textApp} from '../../constants';
import {myHistory} from '../../store/profile/actions';
import {IMyHistory, RootState} from '../../store/types';

import {Colors} from '../../style';
import {showLongToast} from '../../utils';

import {styles} from './style';
interface SaveTrackProps {
  currentPoint: number[];
  endPoint: number[];
}

export const SaveTrack: React.FC<SaveTrackProps> = ({
  currentPoint,
  endPoint,
}) => {
  const dispatch = useDispatch();
  const save = () => {
    const option: IMyHistory = {
      waypoints: [{coordinates: currentPoint}, {coordinates: endPoint}],
      profile: 'driving-traffic',
      geometries: 'geojson',
    };
    dispatch(myHistory(option));
    showLongToast(textApp.waySaved);
  };
  return (
    <Button
      title={textApp.saveWay}
      Icon={<Icon name="ios-save-outline" color={Colors.aqua} size={25} />}
      onPress={save}
    />
  );
};
