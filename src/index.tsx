import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, StoreEnhancer } from 'redux'
import thunk from 'redux-thunk'
import {persistStore, autoRehydrate, Storage} from 'redux-persist'
import * as Icon from 'react-native-vector-icons/Ionicons'

import { registerScreens } from './screens';
import { reducer, State } from './ducks'
import * as CampsitesActions from './ducks/campsites'
import * as PositionActions from './ducks/position'

let enhancer = compose(
  applyMiddleware(thunk),
  autoRehydrate<State>()
) as StoreEnhancer<State>

let initialState = {
  campsites: {},
  // TODO: Would be better if this could be undefined
  position: null,
  starred: []
}

const store = createStore(
  reducer,
  initialState,
  enhancer
)

// begin periodically persisting part of the store (just the starred campsites)
persistStore(store, {storage: AsyncStorage as Storage, whitelist: ['starred']})

// Immediately start getting the campsites data and location
var json = require('../data_simplified.json')
store.dispatch(CampsitesActions.addCampsitesJson(json))
store.dispatch(PositionActions.startUpdatePosition())

registerScreens(store, Provider) // this is where you register all of your app's screens

var listIcon: any
var mapIcon: any

Promise.all(
        [
          Icon.getImageSource('ios-list-box-outline', 30),
          Icon.getImageSource('ios-map-outline', 30)
        ]
      ).then((values) => {
        listIcon = values[0]
        mapIcon = values[1]
        startApp()
        // TODO: Handle error
      })

function startApp() {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: "List",
        screen: 'thatscamping.CampsiteListScreen',
        title: 'Camping near you',
        icon: listIcon
      },
      {
        label: "Map",
        screen: 'thatscamping.CampsiteMapScreen',
        title: 'Camping near you',
        icon: mapIcon
      }
    ]
  })
}
