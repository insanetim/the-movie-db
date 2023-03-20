import mockHttpClient, { mockMultiHttpClient } from 'src/__mocks__/mockHttpClient'
import { fetchLists } from 'src/store/lists/actions'
import { fetchMovieRequest, fetchMovieSuccess, fetchMovieFailure } from '../../actions'
import * as types from '../../types'
import fetchMovie from '../fetchMovie'

jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id')
}))

describe('fetchMovie', () => {
  const dispatch = jest.fn()

  const action = {
    type: types.FETCH_MOVIE,
    payload: 123
  }

  const movieUrl = '/movie/123'
  const movieResponse = { data: { id: 123 } }

  const imagesUrl = '/movie/123/images'
  const imagesResponse = { data: { backdrops: [] } }

  const statesUrl = '/movie/123/account_states'
  const statesBody = { params: { session_id: 'session_id' } }
  const statesResponse = { data: { favorite: false, watchlist: false } }

  const creditsUrl = '/movie/123/credits'
  const creditsResponse = { data: { cast: [], crew: [] } }

  const resultData = {
    ...movieResponse.data,
    images: imagesResponse.data.backdrops,
    accountStates: { ...statesResponse.data },
    credits: { ...creditsResponse.data }
  }

  const beforeFunction = httpClient => () => {
    fetchMovie.process(
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
    expect(fetchMovie).toMatchSnapshot()
  })

  describe('success', () => {
    it('calls right endpoint', async () => {
      const httpClient = mockMultiHttpClient([
        { method: 'get', response: movieResponse },
        { method: 'get', response: imagesResponse },
        { method: 'get', response: statesResponse },
        { method: 'get', response: creditsResponse }
      ])

      await fetchMovie.process(
        {
          httpClient,
          action,
          getState: jest.fn()
        },
        dispatch,
        jest.fn()
      )

      expect(httpClient.get).toHaveBeenCalledTimes(4)
      expect(httpClient.get).toHaveBeenNthCalledWith(1, movieUrl)
      expect(httpClient.get).toHaveBeenNthCalledWith(2, imagesUrl)
      expect(httpClient.get).toHaveBeenNthCalledWith(3, statesUrl, statesBody)
      expect(httpClient.get).toHaveBeenNthCalledWith(4, creditsUrl)
    })

    it('dispatches actions', async () => {
      const httpClient = mockMultiHttpClient([
        { method: 'get', response: movieResponse },
        { method: 'get', response: imagesResponse },
        { method: 'get', response: statesResponse },
        { method: 'get', response: creditsResponse }
      ])

      await fetchMovie.process(
        {
          httpClient,
          action,
          getState: jest.fn()
        },
        dispatch,
        jest.fn()
      )

      expect(dispatch).toHaveBeenCalledTimes(3)
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchMovieRequest())
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchLists())
      expect(dispatch).toHaveBeenNthCalledWith(3, fetchMovieSuccess(resultData))
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
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchMovieRequest())
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchMovieFailure(error))
    })
  })
})
