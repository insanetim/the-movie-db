import * as types from './types'

const initialState = {
  trending: {},
  search: {},
  searchQuery: null
}

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_TRENDING:
      return { ...state, trending: action.payload }
    case types.SET_SEARCH:
      return { ...state, search: action.payload }
    case types.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload }
    case types.CLEAR_SEARCH:
      return { ...state, search: {}, searchQuery: null }
    default:
      return state
  }
}
