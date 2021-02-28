import React from 'react';
import {Pressable, View, Text} from 'react-native';
import {IAdress} from '../../store/types';

import {styles} from './style';
interface RenderItemProps {
  item: IAdress;
  index: number;
  onPress: () => void;
}

export const RenderItem: React.FC<RenderItemProps> = ({
  item,
  index,
  onPress,
}) => {
  return (
    <View>
      <Pressable onPress={onPress} key={index}>
        <Text>{`Маршрут №${index + 1}`}</Text>
        <View>
          <View>
            <Text>Название</Text>
            <Text>{item.name}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
