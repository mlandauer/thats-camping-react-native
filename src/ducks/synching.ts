// Actions
type Action = {
  type: 'UPDATE_MAP_PROGRESS';
  mapProgress: number;
} | {
  type: 'SET_REPLICATING';
  replicating: boolean;
} | {
  type: 'NOOP';
};

// Reducer
export interface State {
  readonly mapProgress: number; // between 0 and 1
  readonly replicating: boolean;
}

export const initialState = {
  mapProgress: 0,
  replicating: false
}

export default function reducer(state: State | undefined = initialState, action: Action): State {
  switch (action.type) {
    case 'UPDATE_MAP_PROGRESS':
      return {...state, mapProgress: action.mapProgress}
    case 'SET_REPLICATING':
      return {...state, replicating: action.replicating}
    default:
      return state
  }
}

// Action Creators
export function updateMapProgress(progress: number): Action {
  return {
    type: 'UPDATE_MAP_PROGRESS',
    mapProgress: progress
  }
}

export function setReplicating(replicating: boolean): Action {
  return {
    type: 'SET_REPLICATING',
    replicating: replicating
  }
}
