import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { accountSelector, sessionIdSelector } from 'src/state/session/selectors'
import { fetchListsFailure, fetchListsRequest, fetchListsSuccess } from '../actions'
import * as types from '../types'

const fetchLists = createLogic({
  type: types.FETCH_LISTS,
  latest: true,

  async process({ httpClient, getState, action }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const { id: accountId } = accountSelector(getState())
    const page = action.payload

    dispatch(fetchListsRequest(page))

    try {
      const { data } = await httpClient.get(endpoints.getCreatedLists(accountId), {
        params: { session_id: sessionId, page }
      })
      dispatch(fetchListsSuccess(data))
    } catch (error) {
      dispatch(fetchListsFailure(error))
    }

    done()
  }
})

export default fetchLists
