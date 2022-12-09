import * as types from './types'

const favoritesReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_FAVORITES:
      return action.payload
    default:
      return state
  }
}

export default favoritesReducer
