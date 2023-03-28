import { createLogic } from 'redux-logic'
import { or, path } from 'ramda'

import * as endpoints from 'src/constants/endpoints'
import { sessionIdSelector } from 'src/store/session/selectors'
import { showNotification } from 'src/store/app/actions'
import { addToList, fetchLists } from '../actions'
import * as types from '../types'

const createList = createLogic({
  type: types.CREATE_LIST,
  latest: true,

  async process({ httpClient, getState, action }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const { listData, movieId } = action.payload

    try {
      const { data } = await httpClient.post(
        endpoints.createList,
        { ...listData },
        { params: { session_id: sessionId } }
      )
      if (typeof movieId !== 'undefined') {
        dispatch(
          addToList({
            listId: data.list_id,
            movieId
          })
        )
      }
      dispatch(fetchLists())
    } catch (error) {
      const errorMessage = or(path(['response', 'data', 'status_message'], error), error.message)
      dispatch(showNotification({ messageType: 'error', messageText: errorMessage }))
    }

    done()
  }
})

export default createList
