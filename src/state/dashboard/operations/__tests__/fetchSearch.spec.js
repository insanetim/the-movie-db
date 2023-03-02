import mockHttpClient from 'src/__mocks__/mockHttpClient'
import * as types from '../../types'
import { fetchSearchRequest, fetchSearchSuccess, fetchSearchFailure } from '../../actions'
import fetchSearch from '../fetchSearch'

describe('fetchSearch', () => {
  const dispatch = jest.fn()
  const action = {
    type: types.FETCH_SEARCH,
    payload: {
      query: 'test/search',
      page: 1
    }
  }
  const url = '/search/movie'
  const body = {
    params: {
      query: 'test/search',
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
    fetchSearch.process(
      {
        httpClient,
        action
      },
      dispatch,
      jest.fn()
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('has valid attributes', () => {
    expect(fetchSearch).toMatchSnapshot()
  })

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response })

    beforeEach(beforeFunction(httpClient))

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledTimes(1)
      expect(httpClient.get).toHaveBeenCalledWith(url, body)
    })

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchSearchRequest(1))
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchSearchSuccess(response.data))
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
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchSearchRequest(1))
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchSearchFailure(error))
    })
  })
})
