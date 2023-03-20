import mockHttpClient, { mockMultiHttpClient } from 'src/__mocks__/mockHttpClient'
import { showNotification } from 'src/store/app/actions'
import * as types from '../../types'
import addToList from '../addToList'

jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id')
}))

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4')
}))

describe('addToList', () => {
  const dispatch = jest.fn()

  const action = {
    type: types.ADD_TO_LIST,
    payload: { listId: 123, movieId: 123 }
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

  const addToListUrl = '/list/123/add_item'
  const addToListBody = { media_id: 123 }
  const addToListConfig = { params: { session_id: 'session_id' } }
  const addToListResponse = { data: { success: true } }

  const beforeFunction = httpClient => () => {
    addToList.process(
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
    expect(addToList).toMatchSnapshot()
  })

  describe('success', () => {
    it('calls right endpoint', async () => {
      const httpClient = mockMultiHttpClient([
        { method: 'get', response: movieResponse },
        { method: 'get', response: listResponse },
        { method: 'post', response: addToListResponse }
      ])

      await addToList.process(
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
      expect(httpClient.post).toHaveBeenCalledWith(addToListUrl, addToListBody, addToListConfig)
    })

    it('dispatches actions', async () => {
      const httpClient = mockMultiHttpClient([
        { method: 'get', response: movieResponse },
        { method: 'get', response: listResponse },
        { method: 'post', response: addToListResponse }
      ])

      await addToList.process(
        {
          httpClient,
          action,
          getState: jest.fn()
        },
        dispatch,
        jest.fn()
      )

      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(showNotification({ messageText: 'test/movie added to test/list' }))
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
