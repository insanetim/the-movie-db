import { nanoid, PayloadAction } from '@reduxjs/toolkit'
import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants'
import { createAppSlice } from 'src/store/withTypes'

import {
  AppState,
  Modal,
  Notification,
  ShowNotificationProps,
  Theme,
} from './types'

const initialState: AppState = {
  modal: {
    modalProps: null,
    modalType: null,
  },
  notifications: [],
  theme: 'light',
}

export const appSlice = createAppSlice({
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
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload
    },
    showModal(state, action: PayloadAction<Modal>) {
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
    selectModal: state => state.modal,
    selectNotification: state => state.notifications,
    selectTheme: state => state.theme,
  },
})

export const {
  hideModal,
  hideNotification,
  setTheme,
  showModal,
  showNotification,
} = appSlice.actions

export const { selectModal, selectNotification, selectTheme } =
  appSlice.selectors

export const appReducer = appSlice.reducer
