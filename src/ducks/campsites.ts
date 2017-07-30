import { Campsite } from '../libs/types'
import { CampsitesJson, convertJson } from '../libs/CampsitesJson'

// Actions
interface NoopAction {
  type: 'NOOP'
}

interface AddCampsitesJsonAction {
  type: 'ADD_CAMPSITES_JSON';
  json: CampsitesJson;
}

export type CampsitesAction = AddCampsitesJsonAction | NoopAction;

// Reducer
export interface CampsitesState {
  readonly [index: number]: Campsite
};

export default function reducer(state: CampsitesState = {}, action: CampsitesAction): CampsitesState {
  switch(action.type) {
    case 'ADD_CAMPSITES_JSON':
      let c2 = convertJson(action.json)
      let c: {[index: number]: Campsite} = {}
      c2.forEach(campsite => {
        c[campsite.id] = campsite
      })
      return Object.assign({}, state, c)
    default:
      return state
  }
}

// Action Creators
export function addCampsitesJson(json: CampsitesJson): CampsitesAction {
  return {
    type: 'ADD_CAMPSITES_JSON',
    json: json
  }
}
