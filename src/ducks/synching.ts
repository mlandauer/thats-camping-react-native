// Actions
type Action = {
  type: 'UPDATE_MAP_PROGRESS';
  mapProgress: number;
} | {
  type: 'NOOP';
};

// Reducer
export interface State {
  readonly mapProgress: number; // between 0 and 1
}

export const initialState = {
  mapProgress: 0,
}

export default function reducer(state: State | undefined = initialState, action: Action): State {
  switch (action.type) {
    case 'UPDATE_MAP_PROGRESS':
      return {...state, mapProgress: action.mapProgress}
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
