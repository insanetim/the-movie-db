import { nanoid, PayloadAction } from '@reduxjs/toolkit'
import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants'
import { createAppSlice } from 'src/store/withTypes'

import { AppState, Notification, ShowNotificationProps, Theme } from './types'

const initialState: AppState = {
  notifications: [],
  theme: 'light',
}

export const appSlice = createAppSlice({
  initialState,
  name: 'app',
  reducers: {
    hideNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      )
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload
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
    selectNotification: state => state.notifications,
    selectTheme: state => state.theme,
    selectThemeIsDark: state => state.theme === 'dark',
  },
})

export const { hideNotification, setTheme, showNotification } = appSlice.actions

export const { selectNotification, selectTheme, selectThemeIsDark } =
  appSlice.selectors

export const appReducer = appSlice.reducer
