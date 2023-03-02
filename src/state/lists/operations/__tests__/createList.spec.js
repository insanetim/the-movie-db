import mockHttpClient from 'src/__mocks__/mockHttpClient'
import { showNotification } from 'src/state/app/actions'
import { mergeDeepRight } from 'ramda'
import * as types from '../../types'
import { fetchLists } from '../../actions'
import createList from '../createList'

jest.mock('src/state/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id')
}))

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4')
}))

describe('createList', () => {
  const dispatch = jest.fn()
  const callback = jest.fn()

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
      expect(dispatch).toHaveBeenCalledWith(fetchLists({ page: 1 }))
    })
  })

  describe('callback', () => {
    const httpClient = mockHttpClient({ method: 'post', response })

    const actionExt = mergeDeepRight(action, { payload: { callback } })

    it('calls callback', async () => {
      await createList.process(
        {
          httpClient,
          action: actionExt,
          getState: jest.fn()
        },
        dispatch,
        jest.fn()
      )

      expect(callback).toHaveBeenCalledTimes(1)
      expect(callback).toHaveBeenCalledWith(response.data.list_id)
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
