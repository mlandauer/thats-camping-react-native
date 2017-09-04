import { combineReducers } from 'redux'
import campsites from '../ducks/campsites'
import position from '../ducks/position'
import starred from '../ducks/starred'
import offlineMap from '../ducks/offlineMap'
import * as Campsites from '../ducks/campsites'
import * as Position from '../ducks/position'
import * as Starred from '../ducks/starred'
import * as OfflineMap from '../ducks/offlineMap'

// Hmmm. I wonder if combineReducers already knows the shape of this type
// so we can do this differently and more elegantly
export interface State {
  readonly campsites: Campsites.State;
  readonly position: Position.State;
  readonly starred: Starred.State;
  readonly offlineMap: OfflineMap.State;
}

export let reducer = combineReducers<State>({
  campsites,
  position,
  starred,
  offlineMap
})

export let initialState = {
  campsites: {},
  // TODO: Would be better if this could be undefined
  position: null,
  starred: [],
  offlineMap: { downloading: false }
}
