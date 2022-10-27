import * as types from './types'

const initialState = {
  watchlist: {}
}

export default function watchlistReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_WATCHLIST:
      return { ...state, watchlist: action.payload }
    default:
      return state
  }
}
