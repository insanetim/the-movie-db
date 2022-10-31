import * as actions from '../actions'

it('loadingOn', () => {
  const expectedAction = {
    type: 'app/LOADING_ON'
  }

  expect(actions.loadingOn()).toEqual(expectedAction)
})

it('loadingOff', () => {
  const expectedAction = {
    type: 'app/LOADING_OFF'
  }

  expect(actions.loadingOff()).toEqual(expectedAction)
})

it('showNotification', () => {
  const expectedAction = {
    type: 'app/SHOW_NOTIFICATION',
    payload: {}
  }

  expect(actions.showNotification({})).toEqual(expectedAction)
})

it('showModal', () => {
  const expectedAction = {
    type: 'app/SHOW_MODAL',
    payload: {}
  }

  expect(actions.showModal({})).toEqual(expectedAction)
})

it('hideModal', () => {
  const expectedAction = {
    type: 'app/HIDE_MODAL'
  }

  expect(actions.hideModal()).toEqual(expectedAction)
})
