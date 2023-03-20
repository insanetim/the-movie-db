import mockHttpClient from 'src/__mocks__/mockHttpClient'
import * as types from '../../types'
import { fetchWatchlistRequest, fetchWatchlistSuccess, fetchWatchlistFailure } from '../../actions'
import fetchWatchlist from '../fetchWatchlist'

jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id'),
  accountSelector: jest.fn(() => ({ id: 123 }))
}))

describe('fetchWatchlist', () => {
  const dispatch = jest.fn()
  const action = {
    type: types.FETCH_WATCHLIST,
    payload: 1
  }
  const url = '/account/123/watchlist/movies'
  const body = {
    params: { session_id: 'session_id', page: 1 }
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
    fetchWatchlist.process(
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
    expect(fetchWatchlist).toMatchSnapshot()
  })

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response })

    beforeEach(beforeFunction(httpClient))

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url, body)
    })

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchWatchlistRequest(1))
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchWatchlistSuccess(response.data))
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
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchWatchlistRequest(1))
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchWatchlistFailure(error))
    })
  })
})
