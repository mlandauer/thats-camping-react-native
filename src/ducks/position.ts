import { Position } from '../libs/types'

// Actions
export type PositionAction = UpdatePositionAction | NoopAction;

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
export type PositionState = Position | null

export default function reducer(state: PositionState = null, action: PositionAction): PositionState {
  switch(action.type) {
    case 'UPDATE_POSITION':
      return action.position;
    default:
      return state
  }
}

// Action Creators
export function updatePosition(lat: number, lng: number): PositionAction {
  return {
    type: 'UPDATE_POSITION',
    position: {lat: lat, lng: lng}
  }
}

export function startUpdatePosition() {
  return (dispatch: (action: {}) => void) => {
    // TODO Also dispatch something immediately to let the user know something is going on
    let locator = new Promise((resolve, reject) => {
			navigator.geolocation.watchPosition(resolve, reject, {enableHighAccuracy: true});
		})
    locator.then((location: Location) => {
      dispatch(updatePosition(location.coords.latitude, location.coords.longitude))
    })
    .catch((err) => {
      console.warn('Error getting location (' + err.code + '): ' + err.message)
    })
  }
}
