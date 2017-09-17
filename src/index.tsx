import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, StoreEnhancer } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, autoRehydrate, Storage } from 'redux-persist'
import * as Icon from 'react-native-vector-icons/Ionicons'

import { registerScreens } from './screens';
import { reducer, State, initialState, stateToSave } from './ducks'
import * as CampsitesActions from './ducks/campsites'
import * as PositionActions from './ducks/position'
import * as OfflineMapActions from './ducks/offlineMap'
import * as Database from './libs/Database'
import * as Map from './libs/Map'

let enhancer = compose(
  applyMiddleware(thunk),
  autoRehydrate<State>()
) as StoreEnhancer<State>

const store = createStore(
  reducer,
  initialState,
  enhancer
)

Map.initialise(progress => store.dispatch(OfflineMapActions.updateProgress(progress)))

// begin periodically persisting part of the store
persistStore(store, { storage: AsyncStorage as Storage, whitelist: stateToSave })

async function initialiseData() {
  // First get all the changes from the local database
  let result = await Database.allChanges()
  store.dispatch(CampsitesActions.updateCampsites(result.campsites))
  // Then start synching with the remote database
  Database.sync()
  // And get all the changes live
  Database.changes(result.last_seq, (campsite) => {
    store.dispatch(CampsitesActions.updateCampsite(campsite))
  })
}

initialiseData()

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
