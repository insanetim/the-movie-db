import { combineReducers, createReducer } from '@reduxjs/toolkit'

import type { IModalState, INotification } from './types'

import {
  hideModal,
  hideNotification,
  showModal,
  showNotification
} from './actions'

const modalInitialState: IModalState = {
  modalProps: null,
  modalType: null
}

const modalReducer = createReducer(modalInitialState, builder => {
  builder.addCase(showModal, (state, action) => {
    state.modalType = action.payload.modalType
    state.modalProps = action.payload.modalProps as never
  })
  builder.addCase(hideModal, state => {
    state.modalProps = { open: false }
  })
})

const notificationsInitialState: INotification[] = []

const notificationsReducer = createReducer(
  notificationsInitialState,
  builder => {
    builder.addCase(showNotification, (state, action) => {
      state.push(action.payload)
    })
    builder.addCase(hideNotification, (state, action) => {
      return state.filter(notification => notification.id !== action.payload)
    })
  }
)

export { modalReducer, notificationsReducer }

export default combineReducers({
  modal: modalReducer,
  notifications: notificationsReducer
})
