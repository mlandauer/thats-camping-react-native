// Actions
type Action = {
  type: 'UPDATE_DOWNLOADING';
  downloading: boolean;
} | {
  type: 'NOOP';
};

// Reducer
export interface State {
  readonly downloading: boolean;
}

export const initialState = {
  downloading: false
}

export default function reducer(state: State | undefined = initialState, action: Action): State {
  switch (action.type) {
    case 'UPDATE_DOWNLOADING':
      return {...state, downloading: action.downloading};
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
