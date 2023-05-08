import { notification } from 'antd'
import { act, renderHook } from '@testing-library/react'

import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'
import useContainer from '../hook'

describe('Notification useContainer hook', () => {
  const successSpy = jest.spyOn(notification, 'success')
  const destroySpy = jest.spyOn(notification, 'destroy')
  const props = {
    id: 'nanoid',
    messageType: NOTIFICATION_TYPE.SUCCESS,
    messageText: 'test/message',
    duration: NOTIFICATION_DURATION,
    hideNotification: jest.fn()
  }

  it('matches snapshot', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('checks `closeNotification` method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.closeNotification()
    })

    expect(props.hideNotification).toHaveBeenCalledWith(props.id)
    expect(destroySpy).toHaveBeenCalledWith(props.id)
  })

  it('checks `useEffect` method', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(successSpy).toHaveBeenCalledWith({
      key: props.id,
      message: props.messageText,
      duration: props.duration,
      onClose: result.current.closeNotification
    })
  })
})
