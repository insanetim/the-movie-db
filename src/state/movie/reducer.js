import { mergeDeepRight } from 'ramda'

import * as types from './types'

const movieInitialState = {
  movie: {},
  loading: true,
  error: null
}

const movieReducer = (state = movieInitialState, action) => {
  switch (action.type) {
    case types.FETCH_MOVIE_REQUEST:
      return {
        movie: {},
        loading: true,
        error: null
      }
    case types.FETCH_MOVIE_SUCCESS:
      return {
        movie: action.payload,
        loading: false,
        error: null
      }
    case types.FETCH_MOVIE_FAILURE:
      return {
        movie: {},
        loading: false,
        error: action.payload
      }
    case types.UPDATE_MOVIE_STATES:
      return mergeDeepRight(state, { movie: { accountStates: action.payload } })
    default:
      return state
  }
}

export default movieReducer
