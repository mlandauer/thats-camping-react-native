import { Campsite } from '../libs/types'

// Actions
type Action = {
  type: 'UPDATE_CAMPSITES';
  campsites: Campsite[];
} | {
  type: 'NOOP'
};

// Reducer
export interface State {
  readonly [index: string]: Campsite
};

export const initialState = {}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'UPDATE_CAMPSITES':
      let c: { [index: string]: Campsite } = {}
      action.campsites.forEach(campsite => {
        c[campsite._id] = campsite
      })
      return { ...state, ...c }
    default:
      return state
  }
}

// Action Creators
export function updateCampsites(campsites: Campsite[]): Action {
  return {
    type: 'UPDATE_CAMPSITES',
    campsites: campsites
  }
}

export function updateCampsite(campsite: Campsite): Action {
  return updateCampsites([campsite])
}
