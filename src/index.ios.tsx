import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {persistStore, autoRehydrate} from 'redux-persist'

import { registerScreens } from './screens';
import { reducer, State } from './ducks'
import * as CampsitesActions from './ducks/campsites'
import * as PositionActions from './ducks/position'

const store = createStore(
  reducer,
  {
    campsites: {},
    // TODO: Would be better if this could be undefined
    position: null,
    starred: []
  },
  compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )
)

// begin periodically persisting part of the store (just the starred campsites)
persistStore(store, {storage: AsyncStorage, whitelist: ['starred']})

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
