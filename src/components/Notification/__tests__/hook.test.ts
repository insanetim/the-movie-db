import { act, renderHook } from '@testing-library/react'
import { notification } from 'antd'
import { NOTIFICATION_DURATION, NOTIFICATION_TYPE } from 'src/constants'

import useContainer from '../hook'
import { NotificationHookProps } from '../types'

// Mock the antd notification
jest.mock('antd', () => ({
  notification: {
    destroy: jest.fn(),
    error: jest.fn(),
    success: jest.fn(),
  },
}))

describe('Notification useContainer hook', () => {
  const mockHideNotification = jest.fn()
  const defaultProps: NotificationHookProps = {
    duration: NOTIFICATION_DURATION,
    hideNotification: mockHideNotification,
    id: 'test-notification',
    message: 'Test notification message',
    type: NOTIFICATION_TYPE.SUCCESS,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize hook with correct default values', () => {
    const { result } = renderHook(() => useContainer(defaultProps))

    expect(result.current).toHaveProperty('onClose')
    expect(typeof result.current.onClose).toBe('function')
  })

  it('should call notification with correct parameters on mount', () => {
    renderHook(() => useContainer(defaultProps))

    expect(notification[defaultProps.type]).toHaveBeenCalledWith({
      duration: defaultProps.duration,
      key: defaultProps.id,
      message: defaultProps.message,
      onClose: expect.any(Function),
    })
  })

  it('should handle different notification types', () => {
    const testCases = [
      { type: NOTIFICATION_TYPE.SUCCESS },
      { type: NOTIFICATION_TYPE.ERROR },
    ]

    testCases.forEach(({ type }) => {
      const props = { ...defaultProps, type }
      renderHook(() => useContainer(props))

      expect(notification[type]).toHaveBeenCalledWith(
        expect.objectContaining({
          key: defaultProps.id,
          message: defaultProps.message,
        })
      )
    })
  })

  describe('onClose', () => {
    it('should call hideNotification and notification.destroy with the correct id', () => {
      const { result } = renderHook(() => useContainer(defaultProps))

      act(() => {
        result.current.onClose()
      })

      expect(mockHideNotification).toHaveBeenCalledWith(defaultProps.id)
      expect(notification.destroy).toHaveBeenCalledWith(defaultProps.id)
    })
  })

  it('should clean up notification on unmount', () => {
    const { unmount } = renderHook(() => useContainer(defaultProps))

    unmount()

    expect(notification.destroy).toHaveBeenCalledWith(defaultProps.id)
  })
})
