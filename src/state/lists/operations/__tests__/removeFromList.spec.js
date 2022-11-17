import mockHttpClient, { mockMultiHttpClient } from 'src/__mocks__/mockHttpClient'
import { showNotification } from 'src/state/app/actions'
import { fetchList } from '../../actions'
import * as types from '../../types'
import removeFromList from '../removeFromList'

jest.mock('src/state/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id')
}))

describe('removeFromList', () => {
  const dispatch = jest.fn()

  const action = {
    type: types.REMOVE_FROM_LIST,
    payload: {
      listId: 123,
      movieId: 123
    }
  }

  const movieUrl = '/movie/123'
  const movieResponse = {
    data: {
      title: 'test/movie'
    }
  }

  const listUrl = '/list/123'
  const listResponse = {
    data: {
      name: 'test/list'
    }
  }

  const removeFromListUrl = '/list/123/remove_item'
  const removeFromListBody = { media_id: 123 }
  const removeFromListConfig = { params: { session_id: 'session_id' } }
  const removeFromListResponse = { data: { success: true } }

  const beforeFunction = httpClient => () => {
    removeFromList.process(
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
    expect(removeFromList).toMatchSnapshot()
  })

  describe('success', () => {
    it('calls right endpoint', async () => {
      const httpClient = mockMultiHttpClient([
        { method: 'get', response: movieResponse },
        { method: 'get', response: listResponse },
        { method: 'post', response: removeFromListResponse }
      ])

      await removeFromList.process(
        {
          httpClient,
          action,
          getState: jest.fn()
        },
        dispatch,
        jest.fn()
      )

      expect(httpClient.get).toHaveBeenCalledTimes(2)
      expect(httpClient.get).toHaveBeenNthCalledWith(1, movieUrl)
      expect(httpClient.get).toHaveBeenNthCalledWith(2, listUrl)
      expect(httpClient.post).toHaveBeenCalledTimes(1)
      expect(httpClient.post).toHaveBeenCalledWith(removeFromListUrl, removeFromListBody, removeFromListConfig)
    })

    it('dispatches actions', async () => {
      const httpClient = mockMultiHttpClient([
        { method: 'get', response: movieResponse },
        { method: 'get', response: listResponse },
        { method: 'post', response: removeFromListResponse }
      ])

      await removeFromList.process(
        {
          httpClient,
          action,
          getState: jest.fn()
        },
        dispatch,
        jest.fn()
      )

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        showNotification({
          type: 'success',
          message: 'test/movie removed from test/list'
        })
      )
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchList(123))
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
