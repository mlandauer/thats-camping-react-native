import { CampsitesJson, Campsite, Position } from '../libs/types'

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
      // Turn parks array into hash
      let parksHash: {[index: number]: any} = {}
      action.json.parks.forEach((park) => {
        parksHash[park.id] = park
      })
      // Turn array in campsites into hash
      let c: {[index: number]: Campsite} = {}
      action.json.campsites.forEach((campsite) => {
        let park = parksHash[campsite.park_id]
        // Convert weird representation of undefined position in json to how we should do it
        let position : (Position | null) = convertPosition(campsite.position)
        c[campsite.id] = Object.assign({}, campsite, {parkName: park.name, position: position})
      })
      return Object.assign({}, state, c)
    default:
      return state
  }
}

function convertPosition(position: Position | {}): (Position | null) {
  if ((<Position>position).lat && (<Position>position).lng) {
    return <Position>position
  } else {
    return null
  }
}

// Action Creators
export function addCampsitesJson(json: CampsitesJson): CampsitesAction {
  return {
    type: 'ADD_CAMPSITES_JSON',
    json: json
  }
}
