import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
import {lineString as makeLineString} from '@turf/helpers';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {useDispatch, useSelector} from 'react-redux';

import {IRootRoute, RootStackParamList} from '../../navigation/interfaces';
import {NavigationPages} from '../../navigation/pages';
import {RootState} from '../../store/types';
import {Colors, COMMON_STYLES} from '../../style';
import {SaveTrack} from '../../containers/SaveTrack';
import {Shared} from '../../containers/Shared';
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
  const {coordinates} = useSelector((store: RootState) => store.auth);
  const accessToken =
    'pk.eyJ1IjoiZGVmZW5kZXJrZW50IiwiYSI6ImNrbGY1aXZuaTB6ZG0ycXA3N3RleHZndWkifQ._YyjfG_JCtG_r9EcnxRhYA';
  const directionsClient = MapboxDirectionsFactory({accessToken});
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const destinationPoint = latitude.length ? latitude : [84.94807, 56.48849];
  const startingPoint = longitude.length ? longitude : [84.94807, 56.48849];
  const [route, setRoute] = useState(null);
  const [currentPoint, setCurrentPoint] = useState([]);
  const [endPoint, setEndPoint] = useState([]);
  useEffect(() => {
    setCurrentPoint(coordinates);
    fetchRoute();
  }, [endPoint]);
  const fetchRoute = async () => {
    try {
      const reqOptions = {
        waypoints: [{coordinates: currentPoint}, {coordinates: endPoint}],
        profile: 'driving-traffic',
        geometries: 'geojson',
      };

      const res = await directionsClient.getDirections(reqOptions).send();
      const newRoute = makeLineString(res.body.routes[0].geometry.coordinates);
      setLatitude(newRoute.geometry.coordinates[0]);
      setLongitude(newRoute.geometry.coordinates[1]);
      setRoute(newRoute);
    } catch (error) {
      console.log('error fetchRoute', error.message);
    }
  };
  const onRegionDidChange = async (newRoute) => {
    try {
      setLatitude(newRoute.geometry.coordinates[1]);
      setLongitude(newRoute.geometry.coordinates[0]);

      setRoute(newRoute);
    } catch (error) {
      console.log('onRegionDidChange', error.message);
    }
  };

  const renderAnnotations = () => {
    return [startingPoint, destinationPoint].map((point, index) => (
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

  const onUserLocationUpdate = (location: Location) => {
    if (location) {
      setEndPoint([location.coords.longitude, location.coords.latitude]);
    }
  };

  return (
    <View style={COMMON_STYLES.screenContainer}>
      <MapboxGL.MapView
        onRegionDidChange={(e) => onRegionDidChange(e)}
        styleURL={MapboxGL.StyleURL.Street}
        zoomLevel={14}
        centerCoordinate={currentPoint}
        style={{flex: 1}}>
        <MapboxGL.UserLocation
          visible={true}
          showsUserHeadingIndicator
          minDisplacement={30}
          onUpdate={(e) => onUserLocationUpdate(e)}
        />
        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={currentPoint}
          animationMode={'flyTo'}
          animationDuration={0}
        />
        {route && (
          <MapboxGL.ShapeSource id="destination" shape={route}>
            <MapboxGL.LineLayer
              id="lineLayer"
              style={{lineWidth: 5, lineJoin: 'bevel', lineColor: Colors.red}}
            />
          </MapboxGL.ShapeSource>
        )}

        {renderAnnotations()}
      </MapboxGL.MapView>
      <View style={styles.buttonContainer}>
        <SaveTrack currentPoint={currentPoint} endPoint={endPoint} />
        <Shared />
      </View>
    </View>
  );
};
