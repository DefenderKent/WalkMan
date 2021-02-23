import {StyleSheet} from 'react-native';
import {Colors, COMMON_STYLES} from '../../style';

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 8,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.white,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    ...COMMON_STYLES.componentContainer,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
