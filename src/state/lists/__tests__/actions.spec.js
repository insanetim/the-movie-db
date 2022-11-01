import * as actions from '../actions'
import * as types from '../types'

const cb = jest.fn()

it('requestLists', () => {
  const expectedAction = {
    type: types.REQUEST_LISTS,
    payload: {},
    cb
  }

  expect(actions.requestLists({}, cb)).toEqual(expectedAction)
})

it('setLists', () => {
  const expectedAction = {
    type: types.SET_LISTS,
    payload: {}
  }

  expect(actions.setLists({})).toEqual(expectedAction)
})

it('requestList', () => {
  const expectedAction = {
    type: types.REQUEST_LIST,
    payload: {},
    cb
  }

  expect(actions.requestList({}, cb)).toEqual(expectedAction)
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
    cb
  }

  expect(actions.createList({}, cb)).toEqual(expectedAction)
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
    cb
  }

  expect(actions.deleteList({}, cb)).toEqual(expectedAction)
})
