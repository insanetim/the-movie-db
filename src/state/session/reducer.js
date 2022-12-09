import { combineReducers } from 'redux'

import * as types from './types'

export const sessionId = (state = null, action) => {
  switch (action.type) {
    case types.SET_SESSION:
      return action.payload
    case types.DELETE_SESSION:
      return null
    default:
      return state
  }
}

export const account = (state = {}, action) => {
  switch (action.type) {
    case types.SET_ACCOUNT:
      return action.payload
    default:
      return state
  }
}

const sessionReducer = combineReducers({ sessionId, account })

export default sessionReducer
