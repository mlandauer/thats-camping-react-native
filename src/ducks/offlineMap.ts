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
interface OfflineMapState {
  readonly downloading: boolean;
}

const initialState = {
  downloading: false
}

export default function reducer(state: OfflineMapState | undefined = initialState, action: OfflineMapAction): OfflineMapState {
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
