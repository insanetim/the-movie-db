import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { requestLists } from '../actions'
import * as types from '../types'

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
        if (cb) cb(data.list_id)
      })
      .finally(() => {
        dispatch(requestLists())
      })
    done()
  }
})

export default createList
