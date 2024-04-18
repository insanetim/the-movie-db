import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'

import { AppState, Notification, ShowNotificationProps } from './types'

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
      state.modal.modalProps = action.payload.modalProps || null
    },
    showNotification: {
      prepare({ duration, message, type }: ShowNotificationProps) {
        return {
          payload: {
            duration: duration || NOTIFICATION_DURATION,
            id: nanoid(),
            message,
            type: type || NOTIFICATION_TYPE.SUCCESS,
          },
        }
      },
      reducer(state, action: PayloadAction<Notification>) {
        state.notifications.push(action.payload)
      },
    },
  },
  selectors: {
    modalSelector: state => state.modal,
    notificationsSelector: state => state.notifications,
  },
})

export const { hideModal, hideNotification, showModal, showNotification } =
  appSlice.actions

export const { modalSelector, notificationsSelector } = appSlice.selectors

export default appSlice.reducer
