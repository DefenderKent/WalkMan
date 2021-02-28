import {StyleSheet} from 'react-native';
import {Colors} from '../../style';
import {COMMON_STYLES} from '../../style/globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(156, 156, 156, 0.8)',
    paddingVertical: 16,
  },
  innerContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    ...COMMON_STYLES.modalContainer,
    marginVertical: 30,
    maxHeight: '100%',
  },
  header: {
    alignItems: 'flex-end',
  },
  close: {
    padding: 8,
    zIndex: 1,
    marginRight: -16,
  },
  title: {
    ...COMMON_STYLES.title,
    color: Colors.silver,
  },
});
