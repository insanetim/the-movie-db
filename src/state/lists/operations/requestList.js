import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { setList } from '../actions'
import * as types from '../types'

const requestList = createLogic({
  type: types.REQUEST_LIST,
  latest: true,
  async process({ httpClient, action: { payload: listId, cb } }, dispatch, done) {
    const { data } = await httpClient.get(endpoints.getListDetails(listId))
    dispatch(setList(data))
    if (cb) cb()
    done()
  }
})

export default requestList
