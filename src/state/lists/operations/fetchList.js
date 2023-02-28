import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import * as types from '../types'
import { fetchListFailure, fetchListRequest, fetchListSuccess } from '../actions'

const fetchList = createLogic({
  type: types.FETCH_LIST,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const listId = action.payload

    dispatch(fetchListRequest())

    try {
      const { data } = await httpClient.get(endpoints.getListDetails(listId))
      dispatch(fetchListSuccess(data))
    } catch (error) {
      dispatch(fetchListFailure(error))
    }

    done()
  }
})

export default fetchList
