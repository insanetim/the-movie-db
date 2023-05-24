import { dispatch, getState } from 'src/__mocks__/react-redux'
import httpClient from 'src/lib/api/httpClient'
import { getTrending, searchMovies } from 'src/lib/apiRoutes'
import { fetchSearch, fetchTrending, setSearchPage, setTrendingPage } from '../actions'

describe('dashboard actions', () => {
  const requestSpy = jest.spyOn(httpClient, 'request')

  describe('fetchTrending', () => {
    const action = fetchTrending(1)

    const request = { url: getTrending, params: { page: 1 } }
    const response = { data: 'test/data' }

    it('success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      const result = await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(result.payload).toEqual(response.data)
    })

    it('failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      const result = await action(dispatch, getState, undefined)

      expect(result.payload).toBe('Something went wrong!')
    })
  })

  describe('fetchSearch', () => {
    const action = fetchSearch({ page: 1, query: 'test/query' })

    const request = {
      url: searchMovies,
      params: { page: 1, query: 'test/query' }
    }
    const response = { data: 'test/data' }

    it('success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      const result = await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(result.payload).toEqual(response.data)
    })

    it('failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      const result = await action(dispatch, getState, undefined)

      expect(result.payload).toBe('Something went wrong!')
    })
  })

  it('setTrendingPage', () => {
    const expectedAction = {
      type: setTrendingPage.toString(),
      payload: 3
    }

    expect(setTrendingPage(3)).toEqual(expectedAction)
  })

  it('setSearchPage', () => {
    const expectedAction = {
      type: setSearchPage.toString(),
      payload: 3
    }

    expect(setSearchPage(3)).toEqual(expectedAction)
  })
})
