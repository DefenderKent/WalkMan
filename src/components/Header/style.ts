import {StyleSheet} from 'react-native';
import {Colors} from '../../style';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Lora-Bold',
    color: Colors.blueApp,
    letterSpacing: 2,
    fontSize: 22,
    lineHeight: 22,
    padding: 10,
  },
  customTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.32,
    color: '#000',
    padding: 10,
  },
});
