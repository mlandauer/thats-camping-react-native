type Action = ToggleStarredAction | NoopAction;

// Actions
interface NoopAction {
  type: 'NOOP'
}

interface ToggleStarredAction {
  type: 'TOGGLE_STARRED';
  campsite_id: string;
}

// Reducer
export type State = string[]

export default function reducer(state: State = [], action: Action): State {
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
