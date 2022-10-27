import { createLogic } from 'redux-logic'
import { merge } from 'lodash'

import * as types from '../types'

const showModal = createLogic({
  type: types.SHOW_MODAL,
  latest: true,
  transform({ action }, next) {
    const newAction = merge(action, {
      payload: {
        modalProps: {
          open: true
        }
      }
    })
    next(newAction)
  }
})

export default showModal
