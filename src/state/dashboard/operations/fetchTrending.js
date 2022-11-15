import { createLogic } from 'redux-logic'
import { pathOr } from 'ramda'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import * as types from '../types'
import { setTrending } from '../actions'

const fetchTrending = createLogic({
  type: types.FETCH_TRENDING,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const page = pathOr(1, ['payload'], action)

    try {
      const { data } = await httpClient.get(endpoints.getTrending, { params: { page } })
      dispatch(setTrending(data))
    } catch (error) {
      dispatch(showNotification({ type: 'error', message: error.message }))
    }

    done()
  }
})

export default fetchTrending
