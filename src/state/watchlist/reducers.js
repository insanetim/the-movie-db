import * as types from './types'

export default function watchlistReducer(state = {}, action) {
  switch (action.type) {
    case types.SET_WATCHLIST:
      return action.payload
    default:
      return state
  }
}
