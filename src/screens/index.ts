import { Navigation } from 'react-native-navigation';
import { Store } from 'redux'

import AboutScreen from './AboutScreen'
import CampsiteIndexScreen from './CampsiteIndexScreen'
import CampsiteDetailScreen from './CampsiteDetailScreen'
import { State } from '../reducers'

// register all screens of the app (including internal ones)
export function registerScreens(store: Store<State>, provider: any) {
  Navigation.registerComponent('thatscamping.AboutScreen', (() => AboutScreen), store, provider)
  Navigation.registerComponent('thatscamping.CampsiteIndexScreen', (() => CampsiteIndexScreen), store, provider)
  Navigation.registerComponent('thatscamping.CampsiteDetailScreen', (() => CampsiteDetailScreen), store, provider)
}
