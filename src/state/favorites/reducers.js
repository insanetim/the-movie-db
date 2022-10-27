import * as types from './types'

const initialState = {
  favorites: {}
}

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_FAVORITES:
      return { ...state, favorites: action.payload }
    default:
      return state
  }
}
