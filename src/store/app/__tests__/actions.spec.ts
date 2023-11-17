import type { IModal } from '../types'

import {
  hideModal,
  hideNotification,
  showModal,
  showNotification
} from '../actions'

describe('app actions', () => {
  it('showModal', () => {
    const expectedAction: {
      payload: IModal
      type: string
    } = {
      payload: {
        modalProps: { movieId: 123 },
        modalType: 'MODAL_CREATE_LIST'
      },
      type: showModal.toString()
    }

    expect(
      showModal({
        modalProps: { movieId: 123 },
        modalType: 'MODAL_CREATE_LIST'
      })
    ).toEqual(expectedAction)
  })

  it('hideModal', () => {
    const expectedAction = {
      type: hideModal.toString()
    }

    expect(hideModal()).toEqual(expectedAction)
  })

  it('showNotification', () => {
    const expectedAction = {
      payload: { messageText: 'test/message' },
      type: showNotification.toString()
    }

    expect(showNotification({ messageText: 'test/message' })).toEqual(
      expectedAction
    )
  })

  it('hideNotification', () => {
    const expectedAction = {
      payload: 'test/id',
      type: hideNotification.toString()
    }

    expect(hideNotification('test/id')).toEqual(expectedAction)
  })
})
