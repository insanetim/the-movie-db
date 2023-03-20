import * as types from './types'

const initialState = {
  movies: {},
  page: 1,
  loading: true,
  error: null
}

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_FAVORITES_REQUEST:
      return {
        movies: {},
        page: action.payload,
        loading: true,
        error: null
      }
    case types.FETCH_FAVORITES_SUCCESS:
      return {
        ...state,
        movies: action.payload,
        loading: false,
        error: null
      }
    case types.FETCH_FAVORITES_FAILURE:
      return {
        movies: {},
        page: 1,
        loading: false,
        error: action.payload
      }
    case types.SET_FAVORITES_PAGE:
      return {
        ...state,
        page: action.payload
      }
    default:
      return state
  }
}

export default favoritesReducer
