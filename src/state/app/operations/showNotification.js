import { createLogic } from 'redux-logic'
import { notification } from 'antd'

import * as types from '../types'

const showNotification = createLogic({
  type: types.SHOW_NOTIFICATION,
  latest: true,
  process({ action }, _, done) {
    const { type, message } = action.payload
    notification[type]({ message, duration: 2.5 })
    done()
  }
})

export default showNotification
