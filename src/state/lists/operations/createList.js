import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import * as types from '../types'
import { fetchLists } from '../actions'

const createList = createLogic({
  type: types.CREATE_LIST,
  latest: true,
  async process({ httpClient, getState, action: { payload, cb } }, dispatch, done) {
    const {
      session: { sessionId }
    } = getState()
    await httpClient
      .post(
        endpoints.createList,
        { ...payload },
        {
          params: {
            session_id: sessionId
          }
        }
      )
      .then(({ data }) => {
        if (typeof cb === 'function') cb(data.list_id)
      })
      .finally(() => {
        dispatch(fetchLists(1))
      })
    done()
  }
})

export default createList
