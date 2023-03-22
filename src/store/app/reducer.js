import { combineReducers } from '@reduxjs/toolkit'

import * as types from './types'

const modalInitialState = {
  modalType: null,
  modalProps: {}
}

export const modal = (state = modalInitialState, action) => {
  switch (action.type) {
    case types.SHOW_MODAL:
      return { ...action.payload }
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

const appReducer = combineReducers({ modal, notifications })

export default appReducer
