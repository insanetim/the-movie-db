import { v4 as uuid } from 'uuid'

import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants'

import * as types from './types'

export const showModal = payload => ({
  type: types.SHOW_MODAL,
  payload
})

export const hideModal = () => ({
  type: types.HIDE_MODAL
})

export const showNotification = ({
  id = uuid(),
  messageType = NOTIFICATION_TYPE.SUCCESS,
  messageText,
  duration = NOTIFICATION_DURATION
}) => ({
  type: types.SHOW_NOTIFICATION,
  payload: {
    id,
    messageType,
    messageText,
    duration
  }
})

export const hideNotification = payload => ({
  type: types.HIDE_NOTIFICATION,
  payload
})
