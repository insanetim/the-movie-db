import { combineReducers } from 'redux'

import * as types from './types'

export const trending = (state = {}, action) => {
  switch (action.type) {
    case types.SET_TRENDING:
      return action.payload
    default:
      return state
  }
}

export const search = (state = {}, action) => {
  switch (action.type) {
    case types.SET_SEARCH:
      return action.payload
    case types.CLEAR_SEARCH:
      return {}
    default:
      return state
  }
}

const dashboardReducer = combineReducers({ trending, search })

export default dashboardReducer
