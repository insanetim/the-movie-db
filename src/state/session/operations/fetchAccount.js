import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import * as types from '../types'
import { setAccount } from '../actions'

const fetchAccount = createLogic({
  type: types.FETCH_ACCOUNT,
  latest: true,
  async process({ httpClient, getState }, dispatch, done) {
    const {
      session: { sessionId }
    } = getState()
    const { data } = await httpClient.get(endpoints.getAccountDetails, {
      params: {
        session_id: sessionId
      }
    })
    dispatch(setAccount(data))
    done()
  }
})

export default fetchAccount
