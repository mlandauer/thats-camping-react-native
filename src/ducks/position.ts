import { Alert } from 'react-native'

import { Position } from '../libs/types'

// Actions
type Action = {
  type: 'UPDATE_POSITION';
  position: Position;
} | {
  type: 'NOOP';
};

// Reducer
export type State = Position | null

// TODO: Would be better if this could be undefined
export const initialState = null

export default function reducer(state: State = initialState, action: Action): State {
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

interface Location {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export function startUpdatePosition() {
  return (dispatch: (action: {}) => void) => {
    // TODO Also dispatch something immediately to let the user know something is going on
    navigator.geolocation.watchPosition(function(location: Location) {
      dispatch(updatePosition(location.coords.latitude, location.coords.longitude))
    }, function(err) {
      console.warn('Error getting location (' + err.code + '): ' + err.message)
    }, { enableHighAccuracy: true })
  }
}
