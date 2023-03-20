import mockHttpClient from 'src/__mocks__/mockHttpClient'
import { showNotification } from 'src/store/app/actions'
import { mergeDeepRight } from 'ramda'
import * as types from '../../types'
import { addToList, fetchLists } from '../../actions'
import createList from '../createList'

jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id')
}))

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4')
}))

describe('createList', () => {
  const dispatch = jest.fn()

  const action = {
    type: types.CREATE_LIST,
    payload: { listData: { name: 'test/list', description: 'test/description' } }
  }

  const url = '/list'
  const body = { ...action.payload.listData }
  const config = { params: { session_id: 'session_id' } }
  const response = {
    data: {
      list_id: 123
    }
  }

  const beforeFunction = httpClient => () => {
    createList.process(
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
    expect(createList).toMatchSnapshot()
  })

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'post', response })

    beforeEach(beforeFunction(httpClient))

    it('calls right endpoint', () => {
      expect(httpClient.post).toHaveBeenCalledTimes(1)
      expect(httpClient.post).toHaveBeenCalledWith(url, body, config)
    })

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(fetchLists())
    })
  })

  describe('with movieId', () => {
    const httpClient = mockHttpClient({ method: 'post', response })

    const actionExt = mergeDeepRight(action, { payload: { movieId: 123 } })

    it('dispatches actions', async () => {
      await createList.process(
        {
          httpClient,
          action: actionExt,
          getState: jest.fn()
        },
        dispatch,
        jest.fn()
      )

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        addToList({
          listId: response.data.list_id,
          movieId: 123
        })
      )
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchLists())
    })
  })

  describe('failure', () => {
    const error = new Error('test/error')

    const httpClient = mockHttpClient({
      method: 'post',
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
