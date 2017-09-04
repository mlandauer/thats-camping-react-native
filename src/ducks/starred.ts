// Actions
type Action = {
  type: 'TOGGLE_STARRED';
  campsite_id: string;
} | {
  type: 'NOOP'
};

// Reducer
export type State = string[]

export const initialState = []

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_STARRED':
      // TODO This all is very long winded. No doubt there is a more elegant way
      const i = state.find((v) => { return v == action.campsite_id })
      if (i == undefined) {
        return state.concat([action.campsite_id])
      } else {
        return state.filter((v) => { return v != action.campsite_id })
      }
    default:
      return state
  }
}

// Action Creators
export function toggleStarredCampsite(campsite_id: string): Action {
  return {
    type: 'TOGGLE_STARRED',
    campsite_id: campsite_id
  }
}
