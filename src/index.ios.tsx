import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { registerScreens } from './screens';
import { reducer, State } from './ducks'
import * as CampsitesActions from './ducks/campsites'
import * as PositionActions from './ducks/position'

const store = createStore(reducer, {
  campsites: {},
  // TODO: Would be better if this could be undefined
  position: null,
  starred: []
}, applyMiddleware(thunk))

// Immediately start getting the campsites data and location
var json = require('../data_simplified.json')
store.dispatch(CampsitesActions.addCampsitesJson(json))
store.dispatch(PositionActions.startUpdatePosition())

registerScreens(store, Provider) // this is where you register all of your app's screens

Navigation.startSingleScreenApp({
  screen: {
    screen: 'thatscamping.CampsiteIndexScreen',
    title: 'Camping near you'
  }
});
