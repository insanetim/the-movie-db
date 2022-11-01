import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import * as types from '../types'
import { setList } from '../actions'

const fetchList = createLogic({
  type: types.FETCH_LIST,
  latest: true,
  async process({ httpClient, action: { payload: listId, cb } }, dispatch, done) {
    const { data } = await httpClient.get(endpoints.getListDetails(listId))
    dispatch(setList(data))
    if (cb) cb()
    done()
  }
})

export default fetchList
