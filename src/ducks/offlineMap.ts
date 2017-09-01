// Actions
export type OfflineMapAction = UpdateDownloadingAction | NoopAction;

interface UpdateDownloadingAction {
  type: 'UPDATE_DOWNLOADING';
  downloading: boolean;
}

interface NoopAction {
  type: 'NOOP';
}

// Reducer
export interface State {
  readonly downloading: boolean;
}

const initialState = {
  downloading: false
}

export default function reducer(state: State | undefined = initialState, action: OfflineMapAction): State {
  switch (action.type) {
    case 'UPDATE_DOWNLOADING':
      return {...state, downloading: action.downloading};
    default:
      return state
  }
}

// Action Creators
export function updateDownloading(downloading: boolean): OfflineMapAction {
  return {
    type: 'UPDATE_DOWNLOADING',
    downloading: downloading
  }
}
