import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'

import type { IModalState } from '../types'

import { hideModal, hideNotification, showModal, showNotification } from '../actions'

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'nonoid')
}))

describe('app actions', () => {
  it('showModal', () => {
    const expectedAction: { payload: IModalState; type: string } = {
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
      payload: {
        duration: NOTIFICATION_DURATION,
        id: 'nonoid',
        messageText: 'test/message',
        messageType: NOTIFICATION_TYPE.SUCCESS
      },
      type: showNotification.toString()
    }

    expect(showNotification({ messageText: 'test/message' })).toEqual(expectedAction)
  })

  it('hideNotification', () => {
    const expectedAction = {
      payload: 'nonoid',
      type: hideNotification.toString()
    }

    expect(hideNotification('nonoid')).toEqual(expectedAction)
  })
})
