import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import MapView, {Polyline, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {IRootRoute, RootStackParamList} from '../../navigation/interfaces';
import {NavigationPages} from '../../navigation/pages';
import {COMMON_STYLES} from '../../style';
import Geolocation from 'react-native-geolocation-service';
import {styles} from './style';
import {SaveTrack, Shared} from '../../containers';

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
interface ILocation {
  latitude: number;
  longitude: number;
}
export const HomeScreen: React.FC<IProps> = ({}) => {
  const {width, height} = Dimensions.get('window');

  const ASPECT_RATIO = width / height;
  const LATITUDE = 56.4884295;
  const LONGITUDE = 84.9480469;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [curPos, setCurPos] = useState({
    latitude: 56.4884295,
    longitude: 84.9480469,
  });
  const [latitudeDelta, seLatitudeDelta] = useState(LATITUDE_DELTA);
  const [longitudeDelta, seLongitudeDelta] = useState(LONGITUDE_DELTA);
  const [origin, setOrigin] = useState({
    latitude: 37.420814,
    longitude: -118.44963,
  });

  const [locations, setLocations] = useState<Array<ILocation>>([]);
  let _watchId: number;
  useEffect(() => {
    _watchId = Geolocation.watchPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        setLocations([...locations, {latitude, longitude}]);
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 100,
        interval: 1000,
        fastestInterval: 1000,
      },
    );
  }, [locations]);
  useEffect(() => {
    return () => {
      if (_watchId !== null) {
        Geolocation.clearWatch(_watchId);
      }
    };
  }, []);
  console.log('locations', locations);

  return (
    <View style={{flex: 1}}>
      {locations.length > 0 && (
        <MapView
          style={{flex: 1}}
          minZoomLevel={15}
          initialRegion={{
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: locations[0].latitude,
              longitude: locations[0].longitude,
            }}
          />
          <Marker coordinate={locations[locations.length - 1]} />

          {locations && (
            <Polyline
              coordinates={locations}
              strokeColor={'#008500'}
              strokeWidth={6}
            />
          )}
        </MapView>
      )}
      {/* <View style={styles.buttonContainer}>
         <SaveTrack currentPoint={{}} endPoint={endPoint} />
        <Shared /> 
      </View>*/}
    </View>
  );
};
