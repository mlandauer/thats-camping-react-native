import { Navigation } from 'react-native-navigation';
import { Store } from 'redux'

import AboutScreen from './AboutScreen'
import CampsiteListScreen from './CampsiteListScreen'
import CampsiteMapScreen from './CampsiteMapScreen'
import CampsiteDetailScreen from './CampsiteDetailScreen'
import { State } from '../ducks'

// register all screens of the app (including internal ones)
export function registerScreens(store: Store<State>, provider: any) {
  Navigation.registerComponent('thatscamping.AboutScreen', (() => AboutScreen), store, provider)
  Navigation.registerComponent('thatscamping.CampsiteListScreen', (() => CampsiteListScreen), store, provider)
  Navigation.registerComponent('thatscamping.CampsiteMapScreen', (() => CampsiteMapScreen), store, provider)
  Navigation.registerComponent('thatscamping.CampsiteDetailScreen', (() => CampsiteDetailScreen), store, provider)
}
