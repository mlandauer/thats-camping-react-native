import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { registerScreens } from './screens';
import { reducer, State } from './reducers'

const store = createStore(reducer, {
  campsites: {},
  // TODO: Would be better if this could be undefined
  position: null,
  starred: []
})

registerScreens(store, Provider) // this is where you register all of your app's screens

Navigation.startSingleScreenApp({
  screen: {
    screen: 'thatscamping.CampsiteIndexScreen',
    title: 'Camping near you'
  }
});
