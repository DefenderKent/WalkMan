import {Animated} from 'react-native';
import along from '@turf/along';
import findDistance from '@turf/distance';
import {point} from '@turf/helpers';

class Polyline {
  _coordinates: any;
  _lineStringFeature: {
    geometry: {
      coordinates: any;
    };
  };
  _totalDistance: number;
  constructor(lineStringFeature: {geometry: {coordinates: any}}) {
    this._coordinates = lineStringFeature.geometry.coordinates;
    this._lineStringFeature = lineStringFeature;

    this._totalDistance = 0;
    for (let i = 1; i < this._coordinates.length; i++) {
      this._totalDistance += findDistance(this.get(i - 1), this.get(i));
    }
  }

  coordinateFromStart(distance: number) {
    const pointAlong = along(this._lineStringFeature, distance);
    pointAlong.properties.distance = distance;
    pointAlong.properties.nearestIndex = this.findNearestFloorIndex(distance);
    return pointAlong;
  }

  findNearestFloorIndex(currentDistance: number) {
    let runningDistance = 0;

    for (let i = 1; i < this._coordinates.length; i++) {
      runningDistance += findDistance(this.get(i - 1), this.get(i));

      if (runningDistance >= currentDistance) {
        return i - 1;
      }
    }

    return -1;
  }

  get(index: number) {
    return point(this._coordinates[index]);
  }

  get totalDistance() {
    return this._totalDistance;
  }
}

class RouteSimulator {
  _previousDistance: number;
  _polyline: Polyline;
  _speed: number;
  _currentDistance: number;
  _listener: any;
  _anim: any;
  _animatedValue: Animated.Value;
  constructor(lineString: {geometry: {coordinates: any}}, speed = 0.04) {
    this._polyline = new Polyline(lineString);
    this._previousDistance = 0;
    this._currentDistance = 0;
    this._speed = speed;
  }

  addListener(listener: any) {
    this._listener = listener;
  }

  start() {
    this.tick();
  }

  reset() {
    this._previousDistance = 0;
    this._currentDistance = 0;
    this.start();
  }

  stop() {
    if (this._anim) {
      this._anim.stop();
    }
  }

  tick() {
    requestAnimationFrame(() => {
      this._previousDistance = this._currentDistance;
      this._currentDistance += this._speed;

      // interpolate between previous to current distance
      const listener = (step: {value: any}) => {
        const currentPosition = this._polyline.coordinateFromStart(step.value);
        this.emit(currentPosition);
      };

      this._animatedValue = new Animated.Value(this._previousDistance);
      this._animatedValue.addListener(listener);

      this._anim = Animated.timing(this._animatedValue, {
        toValue: this._currentDistance,
        duration: 5,
        useNativeDriver: false,
      });

      this._anim.start(() => {
        this._animatedValue.removeListener(listener);

        if (this._currentDistance > this._polyline.totalDistance) {
          this.reset();
          return;
        }

        this.tick();
      });
    });
  }

  emit(pointFeature: any) {
    this._listener(pointFeature);
  }
}

export default RouteSimulator;
