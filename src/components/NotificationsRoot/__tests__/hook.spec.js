import { act, renderHook } from '@testing-library/react-hooks/dom'

import { dispatch } from 'src/__mocks__/react-redux'
import { hideNotification as hideNotificationAction } from 'src/store/app/actions'
import useContainer from '../hook'

jest.mock('src/store/app/selectors', () => ({
  notificationsSelector: jest.fn(() => [
    {
      id: 'test/id',
      messageType: 'success',
      messageText: 'test/message',
      duration: 2.5
    }
  ])
}))

describe('NotificationsRoot useContainer hook', () => {
  let result = null

  beforeEach(() => {
    ;({ result } = renderHook(useContainer))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `hideNotification` method', () => {
    act(() => {
      result.current.hideNotification(123)
    })

    expect(dispatch).toHaveBeenCalledWith(hideNotificationAction(123))
  })
})
