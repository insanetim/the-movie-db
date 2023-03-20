import mockHttpClient, { mockMultiHttpClient } from 'src/__mocks__/mockHttpClient'
import { showNotification } from 'src/store/app/actions'
import { fetchWatchlist } from 'src/store/watchlist/actions'
import { fetchMovieStates } from '../../actions'
import * as types from '../../types'
import changeMovieInWatchlist from '../changeMovieInWatchlist'

jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id'),
  accountSelector: jest.fn(() => ({ id: 123 }))
}))

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4')
}))

describe('changeMovieInWatchlist', () => {
  const dispatch = jest.fn()

  const action = {
    type: types.CHANGE_MOVIE_IN_WATCHLIST,
    payload: {
      movieId: 123,
      inWatchlist: true
    }
  }

  const movieUrl = '/movie/123'
  const movieResponse = { data: { title: 'test/movie' } }

  const watchlistUrl = '/account/123/watchlist'
  const watchlistBody = {
    media_type: 'movie',
    media_id: 123,
    watchlist: true
  }
  const watchlistConfig = { params: { session_id: 'session_id' } }
  const watchlistResponse = { data: { success: true } }

  const beforeFunction = httpClient => () => {
    changeMovieInWatchlist.process(
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
    expect(changeMovieInWatchlist).toMatchSnapshot()
  })

  describe('success', () => {
    it('calls right endpoint', async () => {
      const httpClient = mockMultiHttpClient([
        { method: 'get', response: movieResponse },
        { method: 'post', response: watchlistResponse }
      ])

      await changeMovieInWatchlist.process(
        {
          httpClient,
          action,
          getState: jest.fn()
        },
        dispatch,
        jest.fn()
      )

      expect(httpClient.get).toHaveBeenCalledTimes(1)
      expect(httpClient.get).toHaveBeenCalledWith(movieUrl)
      expect(httpClient.post).toHaveBeenCalledTimes(1)
      expect(httpClient.post).toHaveBeenCalledWith(watchlistUrl, watchlistBody, watchlistConfig)
    })

    it('dispatches actions', async () => {
      const httpClient = mockMultiHttpClient([
        { method: 'get', response: movieResponse },
        { method: 'post', response: watchlistResponse }
      ])

      await changeMovieInWatchlist.process(
        {
          httpClient,
          action,
          getState: jest.fn()
        },
        dispatch,
        jest.fn()
      )

      expect(dispatch).toHaveBeenCalledTimes(3)
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchMovieStates(123))
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchWatchlist())
      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        showNotification({
          messageText: 'test/movie added to Watchlist'
        })
      )
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
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(showNotification({ messageType: 'error', messageText: 'test/error' }))
    })
  })
})
