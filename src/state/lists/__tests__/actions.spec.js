import * as actions from '../actions'
import * as types from '../types'

const callback = jest.fn()

it('fetchLists', () => {
  const expectedAction = {
    type: types.FETCH_LISTS,
    payload: { page: 1, callback }
  }

  expect(actions.fetchLists({ page: 1, callback })).toEqual(expectedAction)
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
    payload: { listData: { name: 'test/name', description: 'test/description' }, callback }
  }

  expect(actions.createList({ listData: { name: 'test/name', description: 'test/description' }, callback })).toEqual(
    expectedAction
  )
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

it('deleteList', () => {
  const expectedAction = {
    type: types.DELETE_LIST,
    payload: { listId: 123, callback }
  }

  expect(actions.deleteList({ listId: 123, callback })).toEqual(expectedAction)
})
