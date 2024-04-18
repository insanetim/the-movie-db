import { act, renderHook } from '@testing-library/react'
import { notification } from 'antd'
import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants/app'

import useContainer from '../hook'
import { NotificationHookProps } from '../types'

describe('Notification useContainer hook', () => {
  const successSpy = jest.spyOn(notification, 'success')
  const destroySpy = jest.spyOn(notification, 'destroy')
  const props: NotificationHookProps = {
    duration: NOTIFICATION_DURATION,
    hideNotification: jest.fn(),
    id: 'test/id',
    message: 'test/message',
    type: NOTIFICATION_TYPE.SUCCESS,
  }

  it('should match snapshot', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('should check "onClose" method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.onClose()
    })

    expect(props.hideNotification).toHaveBeenCalledWith(props.id)
    expect(destroySpy).toHaveBeenCalledWith(props.id)
  })

  it('should check "useEffect" method', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(successSpy).toHaveBeenCalledWith({
      duration: props.duration,
      key: props.id,
      message: props.message,
      onClose: result.current.onClose,
    })
  })
})
