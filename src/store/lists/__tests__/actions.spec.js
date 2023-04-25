import httpClient from 'src/api/httpClient'
import { showNotification } from 'src/store/app/actions'
import * as actions from '../actions'
import * as types from '../types'

describe('lists actions', () => {
  it('fetchLists', () => {
    const expectedAction = {
      type: types.FETCH_LISTS,
      payload: 1
    }

    expect(actions.fetchLists(1)).toEqual(expectedAction)
  })

  it('fetchListsRequest', () => {
    const expectedAction = {
      type: types.FETCH_LISTS_REQUEST,
      payload: 1
    }

    expect(actions.fetchListsRequest(1)).toEqual(expectedAction)
  })

  it('fetchListsSuccess', () => {
    const expectedAction = {
      type: types.FETCH_LISTS_SUCCESS,
      payload: { id: 123 }
    }

    expect(actions.fetchListsSuccess({ id: 123 })).toEqual(expectedAction)
  })

  it('fetchListsFailure', () => {
    const expectedAction = {
      type: types.FETCH_LISTS_FAILURE,
      payload: { message: 'test/error' }
    }

    expect(actions.fetchListsFailure({ message: 'test/error' })).toEqual(expectedAction)
  })

  it('setListsPage', () => {
    const expectedAction = {
      type: types.SET_LISTS_PAGE,
      payload: 3
    }

    expect(actions.setListsPage(3)).toEqual(expectedAction)
  })

  it('fetchList', () => {
    const expectedAction = {
      type: types.FETCH_LIST,
      payload: 123
    }

    expect(actions.fetchList(123)).toEqual(expectedAction)
  })

  it('fetchListRequest', () => {
    const expectedAction = {
      type: types.FETCH_LIST_REQUEST
    }

    expect(actions.fetchListRequest()).toEqual(expectedAction)
  })

  it('fetchListSuccess', () => {
    const expectedAction = {
      type: types.FETCH_LIST_SUCCESS,
      payload: { id: 123 }
    }

    expect(actions.fetchListSuccess({ id: 123 })).toEqual(expectedAction)
  })

  it('fetchListFailure', () => {
    const expectedAction = {
      type: types.FETCH_LIST_FAILURE,
      payload: { message: 'test/error' }
    }

    expect(actions.fetchListFailure({ message: 'test/error' })).toEqual(expectedAction)
  })

  it('createList', () => {
    const expectedAction = {
      type: types.CREATE_LIST,
      payload: { listData: { name: 'test/name', description: 'test/description' }, movieId: 123 }
    }

    expect(
      actions.createList({ listData: { name: 'test/name', description: 'test/description' }, movieId: 123 })
    ).toEqual(expectedAction)
  })

  it('addToList', () => {
    const expectedAction = {
      type: types.ADD_TO_LIST,
      payload: { listId: 123, movieId: 123 }
    }

    expect(actions.addToList({ listId: 123, movieId: 123 })).toEqual(expectedAction)
  })

  it('removeFromList', () => {
    const expectedAction = {
      type: types.REMOVE_FROM_LIST,
      payload: { listId: 123, movieId: 123 }
    }

    expect(actions.removeFromList({ listId: 123, movieId: 123 })).toEqual(expectedAction)
  })
})

jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id')
}))

describe('deleteList', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  const listId = 123

  const deleteListThunk = actions.deleteList(listId)

  const listUrl = '/list/123'
  const listResponse = { data: { name: 'test/list' } }

  const deleteUrl = '/list/123'
  const deleteBody = { params: { session_id: 'session_id' } }
  const deleteResponse = { data: { success: true } }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('success', async () => {
    const getSpy = jest.spyOn(httpClient, 'get').mockResolvedValueOnce(listResponse)
    const deleteSpy = jest.spyOn(httpClient, 'delete').mockResolvedValueOnce(deleteResponse)

    await deleteListThunk(dispatch, getState)

    expect(getSpy).toHaveBeenCalledTimes(1)
    expect(getSpy).toHaveBeenCalledWith(listUrl)
    expect(deleteSpy).toHaveBeenCalledTimes(1)
    expect(deleteSpy).toHaveBeenCalledWith(deleteUrl, deleteBody)

    expect(dispatch).toHaveBeenCalledWith(actions.fetchLists())
  })

  it('failure', async () => {
    const error = new Error('test/error')
    jest.spyOn(httpClient, 'get').mockResolvedValueOnce(listResponse)
    jest.spyOn(httpClient, 'delete').mockRejectedValueOnce(error)

    await deleteListThunk(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(
      showNotification({ messageType: 'success', messageText: 'test/list list has been removed' })
    )
  })
})
