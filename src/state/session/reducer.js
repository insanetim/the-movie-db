import Cookies from 'js-cookie'

import * as types from './types'

const sessionInitialState = {
  sessionId: Cookies.get('session_id') || null,
  account: {},
  loading: false
}

const sessionReducer = (state = sessionInitialState, action) => {
  switch (action.type) {
    case types.SET_SESSION:
      return {
        ...state,
        sessionId: action.payload
      }
    case types.DELETE_SESSION:
      return {
        ...state,
        sessionId: null,
        account: {}
      }
    case types.FETCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: action.payload
      }
    case types.LOADING_ON:
      return {
        ...state,
        loading: true
      }
    case types.LOADING_OFF:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default sessionReducer
