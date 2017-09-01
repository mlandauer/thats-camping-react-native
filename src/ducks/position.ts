import { Position } from '../libs/types'

// Actions
type Action = UpdatePositionAction | NoopAction;

interface NoopAction {
  type: 'NOOP';
}

interface UpdatePositionAction {
  type: 'UPDATE_POSITION';
  position: Position;
}

interface Coords {
  latitude: number;
  longitude: number;
}

interface Location {
  coords: Coords;
}

// Reducer
export type State = Position | null

export default function reducer(state: State = null, action: Action): State {
  switch (action.type) {
    case 'UPDATE_POSITION':
      return action.position;
    default:
      return state
  }
}

// Action Creators
export function updatePosition(lat: number, lng: number): Action {
  return {
    type: 'UPDATE_POSITION',
    position: { lat: lat, lng: lng }
  }
}

export function startUpdatePosition() {
  return (dispatch: (action: {}) => void) => {
    // TODO Also dispatch something immediately to let the user know something is going on
    let locator = new Promise((resolve, reject) => {
      navigator.geolocation.watchPosition(resolve, reject, { enableHighAccuracy: true });
    })
    locator.then((location: Location) => {
      dispatch(updatePosition(location.coords.latitude, location.coords.longitude))
    })
      .catch((err) => {
        console.warn('Error getting location (' + err.code + '): ' + err.message)
      })
  }
}
