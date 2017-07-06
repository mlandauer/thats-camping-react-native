import { combineReducers } from 'redux'
import { campsites, CampsitesState } from '../ducks/campsites'
import { position, PositionState } from '../ducks/position'
import { starred, StarredState } from '../ducks/starred'

// Hmmm. I wonder if combineReducers already knows the shape of this type
// so we can do this differently and more elegantly
export interface State {
    readonly campsites: CampsitesState;
    readonly position: PositionState;
    readonly starred: StarredState;
}

export let reducer = combineReducers<State>({
  campsites,
  position,
  starred
})
