import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'

import { AppState } from './types'

const initialState: AppState = {
  modal: {
    modalProps: null,
    modalType: null,
  },
  notifications: [],
}

const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    hideModal(state) {
      state.modal.modalProps = { open: false }
    },
    hideNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      )
    },
    showModal(state, action) {
      state.modal.modalType = action.payload.modalType
      state.modal.modalProps = action.payload.modalProps ?? null
    },
    showNotification(
      state,
      action: PayloadAction<{
        duration?: number
        messageText: string
        messageType?: NOTIFICATION_TYPE
      }>
    ) {
      state.notifications.push({
        duration: action.payload.duration ?? NOTIFICATION_DURATION,
        id: nanoid(),
        messageText: action.payload.messageText,
        messageType: action.payload.messageType ?? NOTIFICATION_TYPE.SUCCESS,
      })
    },
  },
})

export const { hideModal, hideNotification, showModal, showNotification } =
  appSlice.actions

export default appSlice.reducer
