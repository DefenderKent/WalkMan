import React from 'react';
import {Pressable, View, Text, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {importHistory} from '../../store/profile/actions/friend';
import {setName} from '../../store/profile/actions/user';
import {IAdress} from '../../store/types';
import {RenderItem} from '../RenderItem';

import {styles} from './style';
interface ModalProps {
  title?: string;
  Icon?: React.ReactElement;
  myHistory?: IAdress[];
  onPress: () => void;
}

export const Modal: React.FC<ModalProps> = ({title, myHistory, onPress}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.wrap}>
      <Text>{title}</Text>
      <FlatList
        keyExtractor={(item, index) => `history-${item.name}-${index}`}
        data={myHistory}
        renderItem={({item, index}) => (
          <RenderItem
            item={item}
            index={index}
            onPress={() => dispatch(importHistory(item))}
          />
        )}
      />
    </View>
  );
};
