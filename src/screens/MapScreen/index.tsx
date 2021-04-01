import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MapView, {Polyline, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import {IRootRoute, RootStackParamList} from '../../navigation/interfaces';
import {NavigationPages} from '../../navigation/pages';
import {styles} from './style';
import {SaveTrack, StartTrekking, StopTrekking} from '../../containers';
import {Button, Header} from '../../components';
import {useSelector} from 'react-redux';
import {ILocation, RootState} from '../../store/types';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  route: IRootRoute<NavigationPages.map>;
}

export const MapScreen: React.FC<IProps> = ({route}) => {
  const itinerary = route.params?.item;
  const coordinates = useSelector((state: RootState) => state.auth.coordinates);
  const [playMode, setPlayMode] = useState(false);
  const [locations, setLocations] = useState<Array<ILocation>>([]);
  const resetHistory = () => {
    setLocations([]);
  };
  let _watchId: number;
  useEffect(() => {
    if (playMode) {
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

  return (
    <View style={{flex: 1}}>
      <Header goBack />
      {coordinates && (
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: itinerary
              ? itinerary.history[0].latitude
              : coordinates.latitude,
            longitude: itinerary
              ? itinerary.history[0].longitude
              : coordinates.longitude,
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
          {itinerary && (
            <Polyline
              coordinates={itinerary.history}
              strokeColor={'#008500'}
              strokeWidth={6}
            />
          )}
        </MapView>
      )}
      {!itinerary && (
        <View style={styles.buttonContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button small title="Сбросить" onPress={resetHistory} />
            <SaveTrack locations={locations} />
          </View>

          {playMode ? (
            <StopTrekking setPlayMode={setPlayMode} watchId={_watchId} />
          ) : (
            <StartTrekking setPlayMode={setPlayMode} />
          )}
        </View>
      )}
    </View>
  );
};
