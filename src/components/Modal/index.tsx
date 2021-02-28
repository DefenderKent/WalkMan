import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';

import {textApp} from '../../constants';
import {importHistory} from '../../store/profile/actions/friend';
import {IAdress} from '../../store/types';
import {COMMON_STYLES} from '../../style';
import {showLongToast} from '../../utils';
import {RenderItem} from '../RenderItem';
import {styles} from './style';
interface ModalProps {
  title?: string;
  Icon?: React.ReactElement;
  myHistory?: IAdress[];
  onPress?: () => void;
}

export const Modal: React.FC<ModalProps> = ({title, myHistory, onPress}) => {
  const dispatch = useDispatch();
  const {goBack} = useNavigation();
  return (
    <View style={styles.wrap}>
      <Text>{title}</Text>
      <FlatList
        keyExtractor={(item, index) => `history-${item.name}-${index}`}
        data={myHistory}
        renderItem={({item, index}) => (
          <View style={COMMON_STYLES.renderItem}>
            <RenderItem
              item={item}
              index={index}
              onPress={() => {
                dispatch(importHistory(item));
                goBack();
                showLongToast(textApp.successImport);
              }}
            />
          </View>
        )}
      />
    </View>
  );
};
