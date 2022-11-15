import mockHttpClient, { mockMultiHttpClient } from 'src/__mocks__/mockHttpClient'
import { showNotification } from 'src/state/app/actions'
import * as types from '../../types'
import addToList from '../addToList'

jest.mock('src/state/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id')
}))

describe('addToList', () => {
  const dispatch = jest.fn()

  const action = {
    type: types.ADD_TO_LIST,
    payload: {
      listId: 123,
      movieId: 123
    }
  }

  const movieUrl = '/movie/123'
  const listUrl = '/list/123'
  const addToListUrl = '/list/123/add_item'

  const addToListBody = { media_id: 123 }
  const addToListConfig = { params: { session_id: 'session_id' } }

  const movieResponse = {
    data: {
      title: 'test/movie'
    }
  }
  const listResponse = {
    data: {
      name: 'test/list'
    }
  }

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
        { method: 'post', response: { data: { success: true } } }
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

      expect(httpClient.get).toHaveBeenNthCalledWith(1, movieUrl)
      expect(httpClient.get).toHaveBeenNthCalledWith(2, listUrl)
      expect(httpClient.post).toHaveBeenCalledWith(addToListUrl, addToListBody, addToListConfig)
    })

    it('dispatches actions', async () => {
      const httpClient = mockMultiHttpClient([
        { method: 'get', response: movieResponse },
        { method: 'get', response: listResponse },
        { method: 'post', response: { data: { success: true } } }
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
      expect(dispatch).toHaveBeenCalledWith(
        showNotification({
          type: 'success',
          message: 'test/movie added to test/list'
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
      expect(dispatch).toHaveBeenCalledWith(showNotification({ type: 'error', message: 'test/error' }))
    })
  })
})
