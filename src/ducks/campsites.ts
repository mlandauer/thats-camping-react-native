import { Campsite } from '../libs/types'

// Actions
interface NoopAction {
  type: 'NOOP'
}

interface AddCampsitesAction {
  type: 'ADD_CAMPSITES';
  campsites: Campsite[];
}

export type CampsitesAction = AddCampsitesAction | NoopAction;

// Reducer
export interface CampsitesState {
  readonly [index: number]: Campsite
};

export default function reducer(state: CampsitesState = {}, action: CampsitesAction): CampsitesState {
  switch(action.type) {
    case 'ADD_CAMPSITES':
      let c: {[index: number]: Campsite} = {}
      action.campsites.forEach(campsite => {
        c[campsite.id] = campsite
      })
      return Object.assign({}, state, c)
    default:
      return state
  }
}

// Action Creators
export function addCampsites(campsites: Campsite[]): CampsitesAction {
  return {
    type: 'ADD_CAMPSITES',
    campsites: campsites
  }
}
