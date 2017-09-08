// Actions
type Action = {
  type: 'UPDATE_DOWNLOADING';
  downloading: boolean;
} | {
  type: 'UPDATE_PROGRESS';
  progress: number;
} | {
  type: 'NOOP';
};

// Reducer
export interface State {
  readonly downloading: boolean;
  readonly progress: number; // between 0 and 1
}

export const initialState = {
  downloading: false,
  progress: 0
}

export default function reducer(state: State | undefined = initialState, action: Action): State {
  switch (action.type) {
    case 'UPDATE_DOWNLOADING':
      return {...state, downloading: action.downloading}
    case 'UPDATE_PROGRESS':
      return {...state, progress: action.progress}
    default:
      return state
  }
}

// Action Creators
export function updateDownloading(downloading: boolean): Action {
  return {
    type: 'UPDATE_DOWNLOADING',
    downloading: downloading
  }
}

export function updateProgress(progress: number): Action {
  return {
    type: 'UPDATE_PROGRESS',
    progress: progress
  }
}
