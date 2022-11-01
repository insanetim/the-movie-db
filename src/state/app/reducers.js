import { combineReducers } from 'redux'
import * as R from 'ramda'

import * as types from './types'

export const loading = (state = false, action) => {
  switch (action.type) {
    case types.LOADING_ON:
      return true
    case types.LOADING_OFF:
      return false
    default:
      return state
  }
}

const modalInitialState = {
  modalType: null,
  modalProps: {}
}

export const modal = (state = modalInitialState, action) => {
  switch (action.type) {
    case types.SHOW_MODAL:
      return {
        modalType: R.path(['payload', 'modalType'], action),
        modalProps: R.path(['payload', 'modalProps'], action)
      }
    case types.HIDE_MODAL:
      return { ...state, modalProps: { open: false } }
    default:
      return state
  }
}

const appReducer = combineReducers({ loading, modal })

export default appReducer
