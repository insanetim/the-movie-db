import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import * as types from '../types'
import { setList } from '../actions'

const fetchList = createLogic({
  type: types.FETCH_LIST,
  latest: true,
  async process({ httpClient, action: { payload: listId, cb } }, dispatch, done) {
    try {
      const { data } = await httpClient.get(endpoints.getListDetails(listId))
      dispatch(setList(data))
      if (typeof cb === 'function') cb()
    } catch (error) {
      dispatch(showNotification({ type: 'error', message: error.message }))
    }
    done()
  }
})

export default fetchList
