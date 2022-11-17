import mockHttpClient, { mockMultiHttpClient } from 'src/__mocks__/mockHttpClient'
import { showNotification } from 'src/state/app/actions'
import { fetchFavorites } from 'src/state/favorites/actions'
import { fetchMovieStates } from '../../actions'
import * as types from '../../types'
import changeMovieInFavorites from '../changeMovieInFavorites'

jest.mock('src/state/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id'),
  accountSelector: jest.fn(() => ({ id: 123 }))
}))

describe('changeMovieInFavorites', () => {
  const dispatch = jest.fn()

  const action = {
    type: types.CHANGE_MOVIE_IN_FAVORITES,
    payload: {
      movieId: 123,
      inFavorites: true
    }
  }

  const movieUrl = '/movie/123'
  const movieResponse = {
    data: {
      title: 'test/movie'
    }
  }

  const favoriteUrl = '/account/123/favorite'
  const favoriteBody = {
    media_type: 'movie',
    media_id: 123,
    favorite: true
  }
  const favoriteConfig = { params: { session_id: 'session_id' } }
  const favoriteResponse = { data: { success: true } }

  const beforeFunction = httpClient => () => {
    changeMovieInFavorites.process(
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
    expect(changeMovieInFavorites).toMatchSnapshot()
  })

  describe('success', () => {
    it('calls right endpoint', async () => {
      const httpClient = mockMultiHttpClient([
        { method: 'get', response: movieResponse },
        { method: 'post', response: favoriteResponse }
      ])

      await changeMovieInFavorites.process(
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
      expect(httpClient.post).toHaveBeenCalledWith(favoriteUrl, favoriteBody, favoriteConfig)
    })

    it('dispatches actions', async () => {
      const httpClient = mockMultiHttpClient([
        { method: 'get', response: movieResponse },
        { method: 'post', response: favoriteResponse }
      ])

      await changeMovieInFavorites.process(
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
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchFavorites())
      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        showNotification({ type: 'success', message: 'test/movie added to Favorites' })
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
      expect(dispatch).toHaveBeenCalledWith(showNotification({ type: 'error', message: 'test/error' }))
    })
  })
})
