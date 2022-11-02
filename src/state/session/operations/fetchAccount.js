import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import * as types from '../types'
import { setAccount } from '../actions'
import { sessionIdSelector } from '../selectors'

const fetchAccount = createLogic({
  type: types.FETCH_ACCOUNT,
  latest: true,
  async process({ httpClient, getState }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    try {
      const { data } = await httpClient.get(endpoints.getAccountDetails, {
        params: {
          session_id: sessionId
        }
      })
      dispatch(setAccount(data))
    } catch (error) {
      dispatch(showNotification({ type: 'error', message: error.message }))
    }
    done()
  }
})

export default fetchAccount
