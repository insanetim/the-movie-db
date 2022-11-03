import * as R from 'ramda'

import * as types from './types'

export default function movieReducer(state = {}, action) {
  switch (action.type) {
    case types.SET_MOVIE:
      return action.payload
    case types.SET_MOVIE_STATES:
      return R.mergeDeepRight(state, { accountStates: action.payload })
    default:
      return state
  }
}
