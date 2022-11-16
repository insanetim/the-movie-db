import { createLogic } from 'redux-logic'
import { path, pathOr } from 'ramda'

import * as endpoints from 'src/constants/endpoints'
import { sessionIdSelector } from 'src/state/session/selectors'
import { showNotification } from 'src/state/app/actions'
import { fetchLists } from '../actions'
import * as types from '../types'

const deleteList = createLogic({
  type: types.DELETE_LIST,
  latest: true,

  async process({ httpClient, getState, action }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const listId = path(['payload'], action)
    const callback = pathOr(null, ['callback'], action)
    let list

    try {
      list = await httpClient.get(endpoints.getListDetails(listId))
      await httpClient.delete(endpoints.deleteList(listId), { params: { session_id: sessionId } })
    } catch (error) {
      const errorMessage = `${list.data.name} list has been removed`
      dispatch(showNotification({ type: 'success', message: errorMessage }))
    } finally {
      dispatch(fetchLists(null, callback))
    }

    done()
  }
})

export default deleteList
