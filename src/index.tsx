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
var selectedListIcon: any
var selectedMapIcon: any

Promise.all(
        [
          Icon.getImageSource('ios-list-box-outline', 30),
          Icon.getImageSource('ios-map-outline', 30),
          Icon.getImageSource('ios-list-box', 30),
          Icon.getImageSource('ios-map', 30)
        ]
      ).then((values) => {
        listIcon = values[0]
        mapIcon = values[1]
        selectedListIcon = values[2]
        selectedMapIcon = values[3]
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
        icon: listIcon,
        selectedIcon: selectedListIcon,
        // TODO: No idea why these styles aren't being set via appStyle below for iOS
        navigatorStyle: {
          navBarBackgroundColor: '#97b13d',
          navBarTextColor: '#fff',
          navBarButtonColor: '#fff',
          statusBarTextColorScheme: 'light',
          navBarTextFontSize: 22,
          navBarButtonFontSize: 22
        }
      },
      {
        label: "Map",
        screen: 'thatscamping.CampsiteMapScreen',
        title: 'Camping near you',
        icon: mapIcon,
        selectedIcon: selectedMapIcon,
        // TODO: No idea why these styles aren't being set via appStyle below for iOS
        navigatorStyle: {
          navBarBackgroundColor: '#97b13d',
          navBarTextColor: '#fff',
          navBarButtonColor: '#fff',
          statusBarTextColorScheme: 'light',
          navBarTextFontSize: 22,
          navBarButtonFontSize: 22
        }
      }
    ],
    appStyle: {
      navBarBackgroundColor: '#97b13d',
      navBarTextColor: '#ffffff',
      navBarButtonColor: '#ffffff',
      statusBarTextColorScheme: 'light',
      navBarTextFontSize: 22,
      tabBarLabelColor: 'white',
      tabBarButtonColor: 'white',
      tabBarBackgroundColor: '#97b13d',

      // iOS only
      navBarButtonFontSize: 22,

      // Android only
      statusBarColor: '#97b13d',
    },
    tabsStyle: {
      navBarBackgroundColor: '#97b13d',
      navBarTextColor: '#ffffff',
      navBarButtonColor: '#ffffff',
      statusBarTextColorScheme: 'light',
      navBarTextFontSize: 22,
      tabBarLabelColor: 'white',
      tabBarButtonColor: 'white',
      tabBarBackgroundColor: '#97b13d',

      // iOS only
      navBarButtonFontSize: 22,

      // Android only
      statusBarColor: '#97b13d',
    },
  })
}
