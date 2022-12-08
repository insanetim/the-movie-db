import { combineReducers } from 'redux'
import { path } from 'ramda'

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
        modalType: path(['payload', 'modalType'], action),
        modalProps: path(['payload', 'modalProps'], action)
      }
    case types.HIDE_MODAL:
      return { ...state, modalProps: { open: false } }
    default:
      return state
  }
}

export const notifications = (state = [], action) => {
  switch (action.type) {
    case types.SHOW_NOTIFICATION:
      return [...state, action.payload]
    case types.HIDE_NOTIFICATION:
      return state.filter(notification => notification.id !== action.payload)
    default:
      return state
  }
}

const appReducer = combineReducers({ loading, modal, notifications })

export default appReducer
