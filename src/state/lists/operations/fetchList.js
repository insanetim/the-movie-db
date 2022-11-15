import { createLogic } from 'redux-logic'
import { or, path, pathOr } from 'ramda'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import * as types from '../types'
import { setList } from '../actions'

const fetchList = createLogic({
  type: types.FETCH_LIST,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const listId = path(['payload'], action)
    const callback = pathOr(null, ['callback'], action)

    try {
      const { data } = await httpClient.get(endpoints.getListDetails(listId))
      dispatch(setList(data))
      if (typeof callback === 'function') callback()
    } catch (error) {
      const errorMessage = or(path(['response', 'data', 'status_message'], error), error.message)
      dispatch(showNotification({ type: 'error', message: errorMessage }))
    }

    done()
  }
})

export default fetchList
