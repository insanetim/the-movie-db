import * as types from './types'

const initialState = {
  lists: {},
  list: {}
}

export default function listsReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_LISTS:
      return { ...state, lists: action.payload }
    case types.SET_LIST:
      return { ...state, list: action.payload }
    default:
      return state
  }
}
