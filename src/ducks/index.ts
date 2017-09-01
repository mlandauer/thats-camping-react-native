import { combineReducers } from 'redux'
import campsites from '../ducks/campsites'
import position from '../ducks/position'
import starred from '../ducks/starred'
import offlineMap from '../ducks/offlineMap'
import { CampsitesState } from '../ducks/campsites'
import { PositionState } from '../ducks/position'
import { StarredState } from '../ducks/starred'
import { OfflineMapState } from '../ducks/offlineMap'

// Hmmm. I wonder if combineReducers already knows the shape of this type
// so we can do this differently and more elegantly
export interface State {
  readonly campsites: CampsitesState;
  readonly position: PositionState;
  readonly starred: StarredState;
  readonly offlineMap: OfflineMapState;
}

export let reducer = combineReducers<State>({
  campsites,
  position,
  starred,
  offlineMap
})
