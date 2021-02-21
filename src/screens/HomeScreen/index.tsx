import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MapboxGL from '@react-native-mapbox-gl/maps';

import {IRootRoute, RootStackParamList} from '../../navigation/interfaces';
import {NavigationPages} from '../../navigation/pages';
import {fetchUser} from '../../store/profile/actions';
import {RootState} from '../../store/types';
import {styles} from './style';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: IRootRoute<NavigationPages.home>;
}
interface Ilocation {
  coords: {
    accuracy: number;
    altitude: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
  timestamp: number;
}
export const HomeScreen: React.FC<IProps> = ({route}) => {
  const dispatch = useDispatch();
  const [pointInView1, setpointInView] = useState({});
  const styles2 = {
    icon: {
      iconImage: ['get', 'icon'],

      iconSize: [
        'match',
        ['get', 'icon'],
        'example',
        1.2,
        'airport-15',
        1.2,
        /* default */ 1,
      ],
    },
  };
  const {user} = useSelector((store: RootState) => store.profile.user);
  //получит координаты по нажатию на карту
  // const fetchCoordinates = async (e: any) => {
  //   try {
  //     console.log('333', e);

  //     const pointInView = await e.geometry.coordinates;
  //     setpointInView(pointInView);
  //     console.log('pointInView1', pointInView1);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  const fetchCoordinates = async (e: any) => {
    try {
      const {screenPointX, screenPointY} = e.properties;

      console.log('screenPointX', screenPointX);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    dispatch(fetchUser());
    MapboxGL.locationManager.start();

    return (): void => {
      MapboxGL.locationManager.stop();
    };
  }, []);
  const [location, setLocation] = useState({});

  const onUserLocationUpdate = (location: Ilocation) => {
    setLocation(location);
  };

  return (
    <View style={styles.page}>
      <View style={styles.mapContainer}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={MapboxGL.StyleURL.Light}
          onPress={fetchCoordinates}>
          <MapboxGL.UserLocation
            visible={true}
            onUpdate={onUserLocationUpdate}
          />
          <MapboxGL.Camera
            zoomLevel={15}
            centerCoordinate={[84.94804666666666, 56.48842833333333]}
          />
        </MapboxGL.MapView>
      </View>
    </View>
  );
};
