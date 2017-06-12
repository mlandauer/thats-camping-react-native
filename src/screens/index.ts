import { Navigation } from 'react-native-navigation';

import About from '../components/About'
import CampsiteList from '../components/CampsiteList'

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => About);
  Navigation.registerComponent('example.SecondTabScreen', () => CampsiteList);
}
