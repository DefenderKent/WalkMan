import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import {Button} from '../../components';
import {textApp} from '../../constants';
import {myHistory} from '../../store/profile/actions';
import {addMyHistory} from '../../store/profile/actions/user';
import {ILocation, RootState} from '../../store/types';
import {Colors} from '../../style';
import {showLongToast} from '../../utils';

interface SaveTrackProps {
  locations: ILocation[];
}

export const SaveTrack: React.FC<SaveTrackProps> = ({locations}) => {
  const dispatch = useDispatch();
  const save = () => {
    if (!locations.length) {
      return showLongToast(textApp.emptyCoordinates);
    }
    dispatch(addMyHistory(locations));
    showLongToast(textApp.waySaved);
  };
  return (
    <Button
      title={textApp.saveWay}
      Icon={<Icon name="ios-save-outline" color={Colors.blueApp} size={25} />}
      onPress={save}
    />
  );
};
