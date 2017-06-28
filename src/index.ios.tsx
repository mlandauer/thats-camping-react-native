import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { registerScreens } from './screens';
import { reducer, State } from './reducers'
import * as CampsitesActions from './actions/CampsitesActions'
import * as PositionActions from './actions/PositionActions'

const store = createStore(reducer, {
  campsites: {},
  // TODO: Would be better if this could be undefined
  position: null,
  starred: []
}, applyMiddleware(thunk))

// Immediately start getting the campsites data and location
store.dispatch(CampsitesActions.startSync())
store.dispatch(PositionActions.startUpdatePosition())

registerScreens(store, Provider) // this is where you register all of your app's screens

Navigation.startSingleScreenApp({
  screen: {
    screen: 'thatscamping.CampsiteIndexScreen',
    title: 'Camping near you'
  }
});
