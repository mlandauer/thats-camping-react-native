import { Campsite } from '../libs/types'

// Actions
interface NoopAction {
  type: 'NOOP'
}

interface UpdateCampsitesAction {
  type: 'UPDATE_CAMPSITES';
  campsites: Campsite[];
}

export type CampsitesAction = UpdateCampsitesAction | NoopAction;

// Reducer
export interface State {
  readonly [index: string]: Campsite
};

export default function reducer(state: State = {}, action: CampsitesAction): State {
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
export function updateCampsites(campsites: Campsite[]): CampsitesAction {
  return {
    type: 'UPDATE_CAMPSITES',
    campsites: campsites
  }
}

export function updateCampsite(campsite: Campsite): CampsitesAction {
  return updateCampsites([campsite])
}
