import { Navigation } from 'react-native-navigation';

import AboutScreen from './AboutScreen'
import CampsiteIndexScreen from './CampsiteIndexScreen'

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('thatscamping.AboutScreen', () => AboutScreen);
  Navigation.registerComponent('thatscamping.CampsiteIndexScreen', () => CampsiteIndexScreen);
}
