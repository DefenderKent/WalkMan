import {StyleSheet} from 'react-native';
import {Colors} from '../../style';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    borderWidth: 1,
    borderRadius: 4,
    margin: 4,
    borderColor: Colors.blueApp,
  },
  title: {
    color: Colors.blueApp,
    marginLeft: 10,
  },
});
