import { createLogic } from 'redux-logic'
import { notification as AntdNotification } from 'antd'

import * as types from '../types'

const showNotification = createLogic({
  type: types.SHOW_NOTIFICATION,
  latest: true,
  process(
    {
      action: {
        payload: { type, message }
      }
    },
    dispatch,
    done
  ) {
    AntdNotification[type]({ message, duration: 2.5 })
    done()
  }
})

export default showNotification
