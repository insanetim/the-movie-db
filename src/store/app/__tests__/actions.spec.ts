import type { IModalState } from '../types'
import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'
import { hideModal, hideNotification, showModal, showNotification } from '../actions'

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'nonoid')
}))

describe('app actions', () => {
  it('showModal', () => {
    const expectedAction: { type: string; payload: IModalState } = {
      type: showModal.toString(),
      payload: {
        modalType: 'MODAL_CREATE_LIST',
        modalProps: { movieId: 123 }
      }
    }

    expect(
      showModal({
        modalType: 'MODAL_CREATE_LIST',
        modalProps: { movieId: 123 }
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
      type: showNotification.toString(),
      payload: {
        id: 'nonoid',
        messageType: NOTIFICATION_TYPE.SUCCESS,
        messageText: 'test/message',
        duration: NOTIFICATION_DURATION
      }
    }

    expect(showNotification({ messageText: 'test/message' })).toEqual(expectedAction)
  })

  it('hideNotification', () => {
    const expectedAction = {
      type: hideNotification.toString(),
      payload: 'nonoid'
    }

    expect(hideNotification('nonoid')).toEqual(expectedAction)
  })
})
