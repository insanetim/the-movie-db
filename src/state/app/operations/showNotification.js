import { createLogic } from 'redux-logic'
import { notification } from 'antd'
import { path } from 'ramda'

import * as types from '../types'

const showNotification = createLogic({
  type: types.SHOW_NOTIFICATION,
  latest: true,
  process({ action }) {
    const type = path(['payload', 'type'], action)
    const message = path(['payload', 'message'], action)

    notification[type]({ message, duration: 2.5 })
  }
})

export default showNotification
