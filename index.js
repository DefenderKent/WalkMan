/**
 * @format
 */

import {LogBox} from 'react-native';
import {AppRegistry} from 'react-native';
import {App} from './App';
// @ts-ignore
import {name as appName} from './app.json';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
AppRegistry.registerComponent(appName, () => App);
