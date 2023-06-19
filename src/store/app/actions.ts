import { createAction, nanoid } from '@reduxjs/toolkit'
import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'

import type { INotification, ShowModalProps, ShowNotificationProps } from './types'

import { HIDE_MODAL, HIDE_NOTIFICATION, SHOW_MODAL, SHOW_NOTIFICATION } from './constants'

export const showModal = createAction<ShowModalProps>(SHOW_MODAL)

export const hideModal = createAction(HIDE_MODAL)

export const showNotification = createAction(
  SHOW_NOTIFICATION,
  ({
    duration = NOTIFICATION_DURATION,
    messageText,
    messageType = NOTIFICATION_TYPE.SUCCESS
  }: ShowNotificationProps): { payload: INotification } => {
    const id = nanoid()
    return { payload: { duration, id, messageText, messageType } }
  }
)

export const hideNotification = createAction<string>(HIDE_NOTIFICATION)
