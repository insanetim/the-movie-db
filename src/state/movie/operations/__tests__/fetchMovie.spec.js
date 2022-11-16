import mockHttpClient, { mockMultiHttpClient } from 'src/__mocks__/mockHttpClient'
import { showNotification } from 'src/state/app/actions'
import { fetchLists } from 'src/state/lists/actions'
import { setMovie } from '../../actions'
import * as types from '../../types'
import fetchMovie from '../fetchMovie'

jest.mock('src/state/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id')
}))

describe('fetchMovie', () => {
  const dispatch = jest.fn()
  const callback = jest.fn()

  const action = {
    type: types.FETCH_MOVIE,
    payload: 123
  }

  const movieUrl = '/movie/123'
  const imagesUrl = '/movie/123/images'
  const statesUrl = '/movie/123/account_states'
  const creditsUrl = '/movie/123/credits'

  const statesBody = {
    params: { session_id: 'session_id' }
  }

  const movieResponse = {
    data: {
      id: 123
    }
  }
  const imagesResponse = {
    data: {
      backdrops: []
    }
  }
  const statesResponse = {
    data: {
      favorite: false,
      watchlist: false
    }
  }
  const creditsResponse = {
    data: {
      cast: [],
      crew: []
    }
  }
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

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenNthCalledWith(1, setMovie(resultData))
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchLists())
    })
  })

  describe('callback', () => {
    const httpClient = mockMultiHttpClient([
      { method: 'get', response: movieResponse },
      { method: 'get', response: imagesResponse },
      { method: 'get', response: statesResponse },
      { method: 'get', response: creditsResponse }
    ])

    const actionExt = {
      ...action,
      callback
    }

    it('calls callback', async () => {
      await fetchMovie.process(
        {
          httpClient,
          action: actionExt,
          getState: jest.fn()
        },
        dispatch,
        jest.fn()
      )

      expect(callback).toHaveBeenCalledTimes(1)
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
