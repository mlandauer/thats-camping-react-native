// Actions
type Action = {
  type: 'UPDATE_TEXT';
  text: string;
} | {
  type: 'NOOP';
};

// Reducer
export interface State {
  readonly text: string;
}

export const initialState = {
  text: ""
}

export default function reducer(state: State | undefined = initialState, action: Action): State {
  switch (action.type) {
    case 'UPDATE_TEXT':
      return {...state, text: action.text}
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
