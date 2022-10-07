import { LOADING_OFF, LOADING_ON, SET_SESSION } from './types'

const initialState = {
  sessionId: null,
  loading: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_ON:
      return { ...state, loading: true }
    case LOADING_OFF:
      return { ...state, loading: false }
    case SET_SESSION:
      return { ...state, sessionId: action.payload }
    default:
      return state
  }
}
