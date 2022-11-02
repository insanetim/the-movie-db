import { createLogic } from 'redux-logic'
import { notification } from 'antd'

import * as types from '../types'

const showNotification = createLogic({
  type: types.SHOW_NOTIFICATION,
  latest: true,
  process({
    action: {
      payload: { type, message }
    }
  }) {
    notification[type]({ message, duration: 2.5 })
  }
})

export default showNotification
