import 'jsdom-global/register'
import { notification } from 'antd'
import { act, renderHook } from '@testing-library/react-hooks/dom'

import useContainer from '../hook'

jest.spyOn(notification, 'success')
jest.spyOn(notification, 'destroy')

describe('Notification useContainer hook', () => {
  let result = null

  const props = {
    id: 'test/id',
    messageType: 'success',
    messageText: 'test/message',
    duration: 2.5,
    hideNotification: jest.fn()
  }

  beforeEach(() => {
    ;({ result } = renderHook(() => useContainer(props)))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `closeNotification` method', () => {
    act(() => {
      result.current.closeNotification()
    })

    expect(props.hideNotification).toHaveBeenCalledWith(props.id)
    expect(notification.destroy).toHaveBeenCalledWith(props.id)
  })
})
