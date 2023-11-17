import { createSlice, nanoid } from '@reduxjs/toolkit'
import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'

import type { AppState } from './types'

const initialState: AppState = {
  modal: {
    modalProps: null,
    modalType: null
  },
  notifications: []
}

export const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    hideModal(state) {
      state.modal.modalProps = { open: false }
    },
    hideNotification(state, action) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload.id
      )
    },
    showModal(state, action) {
      state.modal.modalType = action.payload.modalType
      state.modal.modalProps = action.payload.modalProps
    },
    showNotification(state, action) {
      state.notifications.push({
        duration: action.payload.duration ?? NOTIFICATION_DURATION,
        id: nanoid(),
        messageText: action.payload.messageText,
        messageType: action.payload.messageType ?? NOTIFICATION_TYPE.SUCCESS
      })
    }
  }
})

export default appSlice.reducer
