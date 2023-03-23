import { useDispatch } from 'react-redux'
import { act, renderHook } from '@testing-library/react'

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

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(fn => fn()),
  useDispatch: jest.fn()
}))
const dispatch = jest.fn()
useDispatch.mockReturnValue(dispatch)

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
