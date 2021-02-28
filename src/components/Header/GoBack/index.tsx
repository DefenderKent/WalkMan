import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';

import {styles} from './style';
import {navigationRef} from '../../../navigation/NavigationService';
import {Colors} from '../../../style/colors';

interface GoBackType {}

export const GoBack: React.FC<GoBackType> = () => {
  return (
    <TouchableOpacity
      onPress={navigationRef.current?.goBack}
      style={styles.goBack}>
      <Icon
        name="md-chevron-back-sharp"
        style={{color: Colors.blueApp, fontSize: 35}}
      />
    </TouchableOpacity>
  );
};
