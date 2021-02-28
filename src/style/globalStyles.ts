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
  },
  sybTitle: {
    fontSize: 16,
    lineHeight: 16,
  },
  componentContainer: {
    paddingHorizontal: 16,
  },
  renderItem: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.blueApp,
  },
  modalContainer: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
});
