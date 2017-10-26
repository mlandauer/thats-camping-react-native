// Actions
type Action = {
  type: 'UPDATE_PROGRESS';
  progress: number;
} | {
  type: 'UPDATE_RELOAD_PROGRESS';
  progress: number;
} | {
  type: 'NOOP';
};

// Reducer
export interface State {
  readonly progress: number; // between 0 and 1
}

export const initialState = {
  progress: 0,
}

export default function reducer(state: State | undefined = initialState, action: Action): State {
  switch (action.type) {
    case 'UPDATE_PROGRESS':
      return {...state, progress: action.progress}
    default:
      return state
  }
}

// Action Creators
export function updateProgress(progress: number): Action {
  return {
    type: 'UPDATE_PROGRESS',
    progress: progress
  }
}
