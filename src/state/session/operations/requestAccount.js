import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { setAccount } from '../actions'
import * as types from '../types'

const requestAccount = createLogic({
  type: types.REQUEST_ACCOUNT,
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

export default requestAccount
