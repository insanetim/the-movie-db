import { createAction, nanoid } from '@reduxjs/toolkit'
import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'

import type {
  INotification,
  ShowModalProps,
  ShowNotificationProps
} from './types'

import {
  HIDE_MODAL,
  HIDE_NOTIFICATION,
  SHOW_MODAL,
  SHOW_NOTIFICATION
} from './constants'

const showModal = createAction<ShowModalProps>(SHOW_MODAL)

const hideModal = createAction(HIDE_MODAL)

const showNotification = createAction(
  SHOW_NOTIFICATION,
  function prepare({
    duration = NOTIFICATION_DURATION,
    messageText,
    messageType = NOTIFICATION_TYPE.SUCCESS
  }: ShowNotificationProps): { payload: INotification } {
    const id = nanoid()
    return { payload: { duration, id, messageText, messageType } }
  }
)

const hideNotification = createAction<string>(HIDE_NOTIFICATION)

export { hideModal, hideNotification, showModal, showNotification }
