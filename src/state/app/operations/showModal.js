import { createLogic } from 'redux-logic'
import { mergeDeepRight } from 'ramda'

import * as types from '../types'

const showModal = createLogic({
  type: types.SHOW_MODAL,
  latest: true,

  transform({ action }, next) {
    next(mergeDeepRight(action, { payload: { modalProps: { open: true } } }))
  }
})

export default showModal
