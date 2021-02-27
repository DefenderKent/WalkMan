import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

import {Button} from '../../components';
import {textApp} from '../../constants';
import {myHistory} from '../../store/profile/actions';
import {ILocation} from '../../store/types';
import {Colors} from '../../style';
import {showLongToast} from '../../utils';

interface SaveTrackProps {
  locations: ILocation[];
}

export const SaveTrack: React.FC<SaveTrackProps> = ({locations}) => {
  const dispatch = useDispatch();
  const save = () => {
    console.log('SaveTracklocations', locations);

    dispatch(myHistory(locations));
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
