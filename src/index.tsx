import { Navigation } from 'react-native-navigation';
import { AsyncStorage, processColor, AppState, Alert } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, StoreEnhancer } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, autoRehydrate, Storage } from 'redux-persist'
import * as Icon from 'react-native-vector-icons/Ionicons'
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge'
import Config from 'react-native-config'
import * as Instabug from 'instabug-reactnative'

import { registerScreens } from './screens';
import { reducer, State, initialState, stateToSave } from './ducks'
import * as CampsitesActions from './ducks/campsites'
import * as PositionActions from './ducks/position'
import * as Database from './libs/Database'
import * as Map from './libs/Map'
import { Client, Configuration } from 'bugsnag-react-native'

// Initialise bugsnag
const configuration = new Configuration()
// We don't want to be notified of errors in development
configuration.notifyReleaseStages = ['testflight', 'production']
new Client()

let tracker = new GoogleAnalyticsTracker(Config.GOOGLE_ANALYTICS)

Instabug.isRunningLive(function (isLive: boolean) {
  var instabug_api_key: string
  if (isLive) {
    instabug_api_key = Config.INSTABUG_API_KEY_LIVE
  } else {
    instabug_api_key = Config.INSTABUG_API_KEY_BETA
  }
  Instabug.startWithToken(instabug_api_key, Instabug.invocationEvent.shake)
  Instabug.setPrimaryColor(processColor('#97b13d'))
})

let enhancer = compose(
  applyMiddleware(thunk),
  autoRehydrate<State>()
) as StoreEnhancer<State>

const store = createStore(
  reducer,
  initialState,
  enhancer
)

Map.initialise()

// begin periodically persisting part of the store
persistStore(store, { storage: AsyncStorage as Storage, whitelist: stateToSave })

async function initialiseData() {
  // First get all the changes from the local database
  let result = await Database.allChangesLocal()
  store.dispatch(CampsitesActions.updateCampsites(result.campsites))
  Database.replicateRemoteToLocal()
  // And get all the changes live
  Database.changesLocal(result.last_seq, (campsite) => {
    store.dispatch(CampsitesActions.updateCampsite(campsite))
  })
}

initialiseData()

store.dispatch(PositionActions.startUpdatePosition())

// Setup callbacks for tracking application state (e.g. when it's running in the background)
AppState.addEventListener('change', (state: string) => {
  if (store.getState().admin.showStateChanges) {
    Alert.alert("Moved to new state " + state)
  }
})

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
  tracker.trackScreenView('List')
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
    passProps: {
      tracker: tracker
    }
  })
}
