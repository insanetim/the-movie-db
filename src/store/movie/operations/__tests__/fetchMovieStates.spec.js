import mockHttpClient from 'src/__mocks__/httpClientMock'
import { showNotification } from 'src/store/app/actions'
import * as types from '../../types'
import { updateMovieStates } from '../../actions'
import fetchMovieStates from '../fetchMovieStates'

jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id')
}))

describe('fetchMovieStates', () => {
  const dispatch = jest.fn()

  const action = {
    type: types.FETCH_MOVIE_STATES,
    payload: 123
  }

  const url = '/movie/123/account_states'
  const body = { params: { session_id: 'session_id' } }
  const response = { data: { favorite: true, watchlist: true } }

  const beforeFunction = httpClient => () => {
    fetchMovieStates.process(
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
    expect(fetchMovieStates).toMatchSnapshot()
  })

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response })

    beforeEach(beforeFunction(httpClient))

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledTimes(1)
      expect(httpClient.get).toHaveBeenCalledWith(url, body)
    })

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(updateMovieStates(response.data))
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
