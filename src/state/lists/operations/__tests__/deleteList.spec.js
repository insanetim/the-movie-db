import { mockMultiHttpClient } from 'src/__mocks__/mockHttpClient'
import { showNotification } from 'src/state/app/actions'
import * as types from '../../types'
import { fetchLists } from '../../actions'
import deleteList from '../deleteList'

jest.mock('src/state/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id')
}))

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4')
}))

describe('deleteList', () => {
  const dispatch = jest.fn()
  const callback = jest.fn()

  const action = {
    type: types.DELETE_LIST,
    payload: { listId: 123, callback }
  }

  const listUrl = '/list/123'
  const listResponse = {
    data: {
      name: 'test/list'
    }
  }

  const deleteUrl = '/list/123'
  const deleteBody = { params: { session_id: 'session_id' } }
  const deleteResponse = { data: { success: true } }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('has valid attributes', () => {
    expect(deleteList).toMatchSnapshot()
  })

  describe('success', () => {
    it('calls right endpoint', async () => {
      const httpClient = mockMultiHttpClient([
        { method: 'get', response: listResponse },
        { method: 'delete', response: deleteResponse }
      ])

      await deleteList.process(
        {
          httpClient,
          action,
          getState: jest.fn()
        },
        dispatch,
        jest.fn()
      )

      expect(httpClient.get).toHaveBeenCalledTimes(1)
      expect(httpClient.get).toHaveBeenCalledWith(listUrl)
      expect(httpClient.delete).toHaveBeenCalledTimes(1)
      expect(httpClient.delete).toHaveBeenCalledWith(deleteUrl, deleteBody)
    })

    it('dispatches actions', async () => {
      const httpClient = mockMultiHttpClient([
        { method: 'get', response: listResponse },
        { method: 'delete', response: deleteResponse }
      ])

      await deleteList.process(
        {
          httpClient,
          action,
          getState: jest.fn()
        },
        dispatch,
        jest.fn()
      )

      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(fetchLists({ page: 1, callback }))
    })
  })

  describe('failure', () => {
    const error = new Error('test/error')

    const httpClient = mockMultiHttpClient([
      { method: 'get', response: listResponse },
      { method: 'delete', reject: true, response: error }
    ])

    it('dispatches actions', async () => {
      await deleteList.process(
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
        showNotification({ messageType: 'success', messageText: 'test/list list has been removed' })
      )
    })
  })
})
