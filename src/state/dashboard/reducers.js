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

const searchInitialState = {
  search: {},
  searchQuery: null
}

export const search = (state = searchInitialState, action) => {
  switch (action.type) {
    case types.SET_SEARCH:
      return { ...state, search: action.payload }
    case types.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload }
    case types.CLEAR_SEARCH:
      return { search: {}, searchQuery: null }
    default:
      return state
  }
}

const dashboardReducer = combineReducers({ trending, search })

export default dashboardReducer
