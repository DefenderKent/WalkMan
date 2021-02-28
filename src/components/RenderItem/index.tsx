import React from 'react';
import {Pressable, View, Text} from 'react-native';
import {textApp} from '../../constants';
import {IAdress} from '../../store/types';
import {COMMON_STYLES} from '../../style';
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
          <Text style={COMMON_STYLES.sybTitle}>
            {textApp.address}
            {item.name}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};
