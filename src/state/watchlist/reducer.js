import * as types from './types'

const initialState = {
  movies: {},
  page: 1,
  loading: true,
  error: null
}

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_WATCHLIST_REQUEST:
      return {
        movies: {},
        page: action.payload,
        loading: true,
        error: null
      }
    case types.FETCH_WATCHLIST_SUCCESS:
      return {
        ...state,
        movies: action.payload,
        loading: false,
        error: null
      }
    case types.FETCH_WATCHLIST_FAILURE:
      return {
        movies: {},
        page: 1,
        loading: false,
        error: action.payload
      }
    case types.SET_WATCHLIST_PAGE:
      return {
        ...state,
        page: action.payload
      }
    default:
      return state
  }
}

export default watchlistReducer
