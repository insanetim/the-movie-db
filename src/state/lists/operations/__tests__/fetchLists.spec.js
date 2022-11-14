import mockHttpClient from 'src/__mocks__/mockHttpClient'
import { showNotification } from 'src/state/app/actions'
import * as types from '../../types'
import { setLists } from '../../actions'
import fetchLists from '../fetchLists'

jest.mock('src/state/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id'),
  accountSelector: jest.fn(() => ({ id: 123 }))
}))

describe('fetchLists', () => {
  let dispatch = null
  const cb = jest.fn()

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
    dispatch = jest.fn()
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
      expect(httpClient.get).toHaveBeenCalledWith(url, body)
    })

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(1)

      expect(dispatch).toHaveBeenNthCalledWith(1, setLists(response.data))
    })

    it('does not call callback', () => {
      expect(cb).not.toHaveBeenCalled()
    })
  })

  describe('with callback', () => {
    const httpClient = mockHttpClient({ method: 'get', response })

    const newAction = {
      type: types.FETCH_LISTS,
      payload: 1,
      cb
    }

    beforeEach(() => {
      dispatch = jest.fn()
      fetchLists.process(
        {
          httpClient,
          action: newAction,
          getState: jest.fn()
        },
        dispatch,
        jest.fn()
      )
    })

    it('calls callback', () => {
      expect(cb).toHaveBeenCalledTimes(1)
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

      expect(dispatch).toHaveBeenNthCalledWith(1, showNotification({ type: 'error', message: 'test/error' }))
    })
  })
})
