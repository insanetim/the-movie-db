import { mockMultiHttpClient } from 'src/__mocks__/mockHttpClient'
import { showNotification } from 'src/state/app/actions'
import * as types from '../../types'
import { fetchLists } from '../../actions'
import deleteList from '../deleteList'

jest.mock('src/state/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id')
}))

describe('deleteList', () => {
  const dispatch = jest.fn()
  const callback = jest.fn()

  const action = {
    type: types.DELETE_LIST,
    payload: 123,
    callback
  }

  const listUrl = '/list/123'
  const deleteUrl = '/list/123'

  const deleteBody = { params: { session_id: 'session_id' } }

  const listResponse = {
    data: {
      name: 'test/list'
    }
  }

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
        { method: 'delete', response: { data: { success: true } } }
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

      expect(httpClient.get).toHaveBeenCalledWith(listUrl)
      expect(httpClient.delete).toHaveBeenCalledWith(deleteUrl, deleteBody)
    })

    it('dispatches actions', async () => {
      const httpClient = mockMultiHttpClient([
        { method: 'get', response: listResponse },
        { method: 'delete', response: { data: { success: true } } }
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
      expect(dispatch).toHaveBeenCalledWith(fetchLists(null, callback))
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

      expect(dispatch).toHaveBeenCalledWith(
        showNotification({
          type: 'success',
          message: 'test/list list has been removed'
        })
      )
    })
  })
})
