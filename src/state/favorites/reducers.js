import * as types from './types'

export default function favoritesReducer(state = {}, action) {
  switch (action.type) {
    case types.SET_FAVORITES:
      return action.payload
    default:
      return state
  }
}
