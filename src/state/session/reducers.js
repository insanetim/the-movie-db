import * as types from './types'

const initialState = {
  sessionId: null,
  account: {}
}

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_SESSION:
      return { ...state, sessionId: action.payload }
    case types.DELETE_SESSION:
      return { ...state, sessionId: null }
    case types.SET_ACCOUNT:
      return { ...state, account: action.payload }
    default:
      return state
  }
}
