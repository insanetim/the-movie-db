import * as actions from '../actions'
import * as types from '../types'

const callback = jest.fn()

it('fetchLists', () => {
  const expectedAction = {
    type: types.FETCH_LISTS,
    payload: {},
    callback
  }

  expect(actions.fetchLists({}, callback)).toEqual(expectedAction)
})

it('setLists', () => {
  const expectedAction = {
    type: types.SET_LISTS,
    payload: {}
  }

  expect(actions.setLists({})).toEqual(expectedAction)
})

it('fetchList', () => {
  const expectedAction = {
    type: types.FETCH_LIST,
    payload: {},
    callback
  }

  expect(actions.fetchList({}, callback)).toEqual(expectedAction)
})

it('setList', () => {
  const expectedAction = {
    type: types.SET_LIST,
    payload: {}
  }

  expect(actions.setList({})).toEqual(expectedAction)
})

it('createList', () => {
  const expectedAction = {
    type: types.CREATE_LIST,
    payload: {},
    callback
  }

  expect(actions.createList({}, callback)).toEqual(expectedAction)
})

it('addToList', () => {
  const expectedAction = {
    type: types.ADD_TO_LIST,
    payload: {}
  }

  expect(actions.addToList({})).toEqual(expectedAction)
})

it('removeFromList', () => {
  const expectedAction = {
    type: types.REMOVE_FROM_LIST,
    payload: {}
  }

  expect(actions.removeFromList({})).toEqual(expectedAction)
})

it('deleteList', () => {
  const expectedAction = {
    type: types.DELETE_LIST,
    payload: {},
    callback
  }

  expect(actions.deleteList({}, callback)).toEqual(expectedAction)
})
