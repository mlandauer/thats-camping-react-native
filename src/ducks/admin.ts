// Actions
type Action = {
  type: 'UPDATE_TEXT';
  text: string;
} | {
  type: 'TOGGLE_SHOW_STATE_CHANGES'
} | {
  type: 'NOOP';
};

// Reducer
export interface State {
  readonly text: string;
  readonly showStateChanges: boolean;
}

export const initialState = {
  text: "",
  showStateChanges: false
}

export default function reducer(state: State | undefined = initialState, action: Action): State {
  switch (action.type) {
    case 'UPDATE_TEXT':
      return {...state, text: action.text}
    case 'TOGGLE_SHOW_STATE_CHANGES':
      return {...state, showStateChanges: !state.showStateChanges}
    default:
      return state
  }
}

// Action Creators
export function updateText(text: string): Action {
  return {
    type: 'UPDATE_TEXT',
    text: text
  }
}

export function toggleShowStateChanges(): Action {
  return {
    type: 'TOGGLE_SHOW_STATE_CHANGES'
  }
}
