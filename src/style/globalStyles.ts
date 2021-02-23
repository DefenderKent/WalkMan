import {StyleSheet} from 'react-native';
import {Colors} from './colors';

export const COMMON_STYLES = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: 'bold',
  },
  componentContainer: {
    paddingHorizontal: 16,
  },
});
