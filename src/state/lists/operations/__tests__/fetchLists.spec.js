import mockHttpClient from 'src/__mocks__/mockHttpClient'
import * as types from '../../types'
import { fetchListsRequest, fetchListsSuccess, fetchListsFailure } from '../../actions'
import fetchLists from '../fetchLists'

jest.mock('src/state/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id'),
  accountSelector: jest.fn(() => ({ id: 123 }))
}))

describe('fetchLists', () => {
  const dispatch = jest.fn()

  const action = {
    type: types.FETCH_LISTS,
    payload: 1
  }

  const url = '/account/123/lists'
  const body = {
    params: {
      session_id: 'session_id',
      page: 1
    }
  }
  const response = {
    data: {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0
    }
  }

  const beforeFunction = httpClient => () => {
    fetchLists.process(
      {
        httpClient,
        action,
        getState: jest.fn()
      },
      dispatch,
      jest.fn()
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('has valid attributes', () => {
    expect(fetchLists).toMatchSnapshot()
  })

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response })

    beforeEach(beforeFunction(httpClient))

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledTimes(1)
      expect(httpClient.get).toHaveBeenCalledWith(url, body)
    })

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchListsRequest(1))
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchListsSuccess(response.data))
    })
  })

  describe('failure', () => {
    const error = new Error('test/error')

    const httpClient = mockHttpClient({
      method: 'get',
      reject: true,
      response: error
    })

    beforeEach(beforeFunction(httpClient))

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchListsRequest(1))
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchListsFailure(error))
    })
  })
})
