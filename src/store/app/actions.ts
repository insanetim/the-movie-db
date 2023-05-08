import { createAction, nanoid } from '@reduxjs/toolkit'

import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'
import type { INotification, ShowModalProps, ShowNotificationProps } from './types'
import { HIDE_MODAL, HIDE_NOTIFICATION, SHOW_MODAL, SHOW_NOTIFICATION } from './constants'

export const showModal = createAction<ShowModalProps>(SHOW_MODAL)

export const hideModal = createAction(HIDE_MODAL)

export const showNotification = createAction(
  SHOW_NOTIFICATION,
  ({
    messageType = NOTIFICATION_TYPE.SUCCESS,
    messageText,
    duration = NOTIFICATION_DURATION
  }: ShowNotificationProps): { payload: INotification } => {
    const id = nanoid()
    return { payload: { id, messageType, messageText, duration } }
  }
)

export const hideNotification = createAction<string>(HIDE_NOTIFICATION)
