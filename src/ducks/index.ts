import { combineReducers } from 'redux'
import campsites from '../ducks/campsites'
import position from '../ducks/position'
import starred from '../ducks/starred'
import offlineMap from '../ducks/offlineMap'
import admin from '../ducks/admin'
import * as Campsites from '../ducks/campsites'
import * as Position from '../ducks/position'
import * as Starred from '../ducks/starred'
import * as OfflineMap from '../ducks/offlineMap'
import * as Admin from '../ducks/admin'

// Hmmm. I wonder if combineReducers already knows the shape of this type
// so we can do this differently and more elegantly
export interface State {
  readonly campsites: Campsites.State;
  readonly position: Position.State;
  readonly starred: Starred.State;
  readonly offlineMap: OfflineMap.State;
  readonly admin: Admin.State;
}

export let reducer = combineReducers<State>({
  campsites,
  position,
  starred,
  offlineMap,
  admin
})

export const initialState = {
  campsites: Campsites.initialState,
  position: Position.initialState,
  starred: Starred.initialState,
  offlineMap: OfflineMap.initialState,
  admin: Admin.initialState
}

// Parts of the state to save away
export const stateToSave = [
  'starred',
  'offlineMap'
]
