import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Image,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {lineString as makeLineString} from '@turf/helpers';

import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
import {IRootRoute, RootStackParamList} from '../../navigation/interfaces';
import {NavigationPages} from '../../navigation/pages';
import {fetchUser} from '../../store/profile/actions';
import {RootState} from '../../store/types';
import {styles} from './style';

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
  const accessToken =
    'pk.eyJ1IjoiZGVmZW5kZXJrZW50IiwiYSI6ImNrbGY1aXZuaTB6ZG0ycXA3N3RleHZndWkifQ._YyjfG_JCtG_r9EcnxRhYA';
  const directionsClient = MapboxDirectionsFactory({accessToken});
  // const destinationPoint = [56.4916955344, 84.9482140289];
  // const startingPoint = [56.4884295, 84.9480469];
  const [locationFir, setFir] = useState([]);
  const [locationLast, setLast] = useState([]);

  const destinationPoint = locationFir.length
    ? locationFir
    : [84.9482140289, 56.4916955344];
  const startingPoint = locationLast.length
    ? locationLast
    : [84.9480469, 56.4884295];
  const [route, setRoute] = useState(null);

  const [location, setLocation] = useState({});
  const startDestinationPoints = [startingPoint, destinationPoint];

  useEffect(() => {
    fetchRoute();
    // MapboxGL.locationManager.start();

    // return (): void => {
    //   MapboxGL.locationManager.stop();
    // };
  }, []);

  const fetchRoute = async () => {
    const reqOptions = {
      waypoints: [
        {coordinates: startingPoint},
        {coordinates: destinationPoint},
      ],
      profile: 'driving-traffic',
      geometries: 'geojson',
    };

    const res = await directionsClient.getDirections(reqOptions).send();

    const newRoute = makeLineString(res.body.routes[0].geometry.coordinates);
    setRoute(newRoute);
  };

  console.log('newRoute?newRoute', route);

  const renderAnnotations = () => {
    return startDestinationPoints.map((point, index) => (
      <MapboxGL.PointAnnotation
        key={`${index}-PointAnnotation`}
        id={`${index}-PointAnnotation`}
        coordinate={point}>
        <View
          style={{
            height: 30,
            width: 30,
            backgroundColor: '#00cccc',
            borderRadius: 30,
            borderColor: '#fff',
            borderWidth: 3,
          }}
        />
      </MapboxGL.PointAnnotation>
    ));
  };

  const araTest = [];
  const onUserLocationUpdate = (location: Location) => {
    setLocation(location);
  };

  console.log('location', location);
  console.log('locationFir', locationFir);

  console.log('locationLast', locationLast);

  return (
    <View style={{flex: 1, height: '100%', width: '100%'}}>
      <MapboxGL.MapView
        styleURL={MapboxGL.StyleURL.Street}
        zoomLevel={14}
        centerCoordinate={startingPoint}
        style={{flex: 1}}>
        <MapboxGL.UserLocation
          visible={true}
          showsUserHeadingIndicator
          minDisplacement={5}
          onUpdate={(e) => onUserLocationUpdate(e)}
        />
        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={startingPoint}
          animationMode={'flyTo'}
          animationDuration={0}></MapboxGL.Camera>
        {renderAnnotations()}
        {route && (
          <MapboxGL.ShapeSource id="shapeSource" shape={route}>
            <MapboxGL.LineLayer
              id="lineLayer"
              style={{lineWidth: 5, lineJoin: 'bevel', lineColor: '#ff0000'}}
            />
          </MapboxGL.ShapeSource>
        )}
      </MapboxGL.MapView>
      <View style={{height: 60}}>
        <Pressable
          style={{height: 25, backgroundColor: 'red'}}
          onPress={() => {
            const testar = [];
            testar.push(location.coords.longitude);
            testar.push(location.coords.latitude);
            setFir(testar);
            console.log('First', testar);
          }}>
          <Text>First</Text>
        </Pressable>
        <Pressable
          style={{height: 25, backgroundColor: 'green'}}
          onPress={() => {
            const testar = [];
            testar.push(location.coords.longitude);
            testar.push(location.coords.latitude);
            setLast(testar);
          }}>
          <Text>Last</Text>
        </Pressable>
      </View>
    </View>
  );
};
