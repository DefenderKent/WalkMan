import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import MapView, {Polyline, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import {IRootRoute, RootStackParamList} from '../../navigation/interfaces';
import {NavigationPages} from '../../navigation/pages';
import {styles} from './style';
import {SaveTrack, StartTrekking, StopTrekking} from '../../containers';
import {Button} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {ILocation, RootState} from '../../store/types';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: IRootRoute<NavigationPages.home>;
}
interface Location {
  coords: Coordinates;
  timestamp?: number;
}

interface Coordinates {
  heading?: number;
  speed?: number;
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
}

export const HomeScreen: React.FC<IProps> = ({}) => {
  const {width, height} = Dimensions.get('window');
  const coordinates = useSelector((state: RootState) => state.auth.coordinates);
  const ASPECT_RATIO = width / height;
  const LATITUDE = 56.4884295;
  const LONGITUDE = 84.9480469;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const APIKEY = 'AIzaSyCFQs_e6mCpzj0iTOecBqZFu8lWdnpPFCE';
  const [latitudeDelta, seLatitudeDelta] = useState(LATITUDE_DELTA);
  const [longitudeDelta, seLongitudeDelta] = useState(LONGITUDE_DELTA);
  const [origin, setOrigin] = useState({
    latitude: 37.420814,
    longitude: -118.44963,
  });
  const [endPos, setEndPos] = useState({latitude: 56.4868, longitude: 84.9484});
  const [editing, setEditing] = useState(null);

  const [playMode, setPlayMode] = useState(false);

  const [locations, setLocations] = useState<Array<ILocation>>([]);
  const dispatch = useDispatch();
  let _watchId: number;
  useEffect(() => {
    console.log('playMode', playMode);

    if (playMode) {
      _watchId = Geolocation.watchPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          console.log('playMode', playMode);
          setLocations([...locations, {latitude, longitude}]);
        },
        (error) => {
          console.log(error);
        },

        {
          enableHighAccuracy: true,
          distanceFilter: 50,
          interval: 1000,
          fastestInterval: 1000,
          maximumAge: 10000,
          accuracy: {
            android: 'high',
            ios: 'best',
          },
        },
      );
    }
    return () => {
      if (_watchId !== null) {
        Geolocation.clearWatch(_watchId);
      }
    };
  }, [locations, playMode, coordinates]);

  console.log('locations', locations);
  console.log('coordinates', coordinates);

  return (
    <View style={{flex: 1}}>
      {coordinates && (
        <MapView
          style={{flex: 1}}
          minZoomLevel={15}
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {!playMode && (
            <Marker
              coordinate={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              }}
            />
          )}
          {locations.length > 0 && (
            <Marker coordinate={locations[locations.length - 1]} />
          )}

          {locations && (
            <Polyline
              coordinates={locations}
              strokeColor={'#008500'}
              strokeWidth={6}
            />
          )}
        </MapView>
      )}
      <View style={styles.buttonContainer}>
        <SaveTrack locations={locations} />
        <Button title="Сбросить" onPress={() => setLocations([])} />
        {playMode ? (
          <StopTrekking setPlayMode={setPlayMode} watchId={_watchId} />
        ) : (
          <StartTrekking setPlayMode={setPlayMode} />
        )}
        {/* <Shared /> */}
      </View>
    </View>
  );
};
