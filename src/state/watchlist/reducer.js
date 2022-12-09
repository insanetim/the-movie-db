import * as types from './types'

const watchlistReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_WATCHLIST:
      return action.payload
    default:
      return state
  }
}

export default watchlistReducer
