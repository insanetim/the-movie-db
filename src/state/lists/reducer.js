import { combineReducers } from 'redux'

import * as types from './types'

export const lists = (state = {}, action) => {
  switch (action.type) {
    case types.SET_LISTS:
      return action.payload
    default:
      return state
  }
}

export const list = (state = {}, action) => {
  switch (action.type) {
    case types.SET_LIST:
      return action.payload
    default:
      return state
  }
}

const listsReducer = combineReducers({ lists, list })

export default listsReducer
