import { act, renderHook } from '@testing-library/react'
import {
  hideNotification as hideNotificationAction,
  selectNotification,
} from 'src/store/features/app'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'

import useContainer from '../hook'

jest.mock('src/store/features/app')
jest.mock('src/store/hooks')

const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<
  typeof useAppDispatch
>
const mockUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>
const mockSelectNotification = selectNotification as jest.MockedFunction<
  typeof selectNotification
>
const mockHideNotificationAction =
  hideNotificationAction as unknown as jest.MockedFunction<
    typeof hideNotificationAction
  >

describe('NotificationsRoot useContainer hook', () => {
  const mockDispatch = jest.fn()

  beforeEach(() => {
    mockUseAppDispatch.mockReturnValue(mockDispatch)
    mockUseAppSelector.mockReturnValue([])
    mockSelectNotification.mockReturnValue([])
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Redux integration', () => {
    it('should call useAppDispatch and return dispatch function', () => {
      renderHook(() => useContainer())

      expect(mockUseAppDispatch).toHaveBeenCalled()
    })

    it('should call useAppSelector with selectNotification', () => {
      renderHook(() => useContainer())

      expect(mockUseAppSelector).toHaveBeenCalledWith(mockSelectNotification)
    })
  })

  describe('Notifications state handling', () => {
    it('should return notifications from selector', () => {
      const notifications = [
        { id: '1', message: 'Hello', type: 'SUCCESS' },
        { id: '2', message: 'World', type: 'ERROR' },
      ]

      mockUseAppSelector.mockReturnValue(notifications)

      const { result } = renderHook(() => useContainer())

      expect(result.current.notifications).toEqual(notifications)
    })

    it('should reflect notifications state changes on rerender', () => {
      const first = [{ id: '1', message: 'A', type: 'SUCCESS' }]
      const second = [
        { id: '1', message: 'A', type: 'SUCCESS' },
        { id: '2', message: 'B', type: 'ERROR' },
      ]

      mockUseAppSelector.mockReturnValue(first)

      const { rerender, result } = renderHook(() => useContainer())

      expect(result.current.notifications).toEqual(first)

      mockUseAppSelector.mockReturnValue(second)
      rerender()

      expect(result.current.notifications).toEqual(second)
    })
  })

  describe('hideNotification functionality', () => {
    it('should dispatch hideNotification action with provided id', () => {
      const { result } = renderHook(() => useContainer())

      act(() => {
        result.current.hideNotification('notif-123')
      })

      expect(mockDispatch).toHaveBeenCalledTimes(1)
      expect(mockDispatch).toHaveBeenCalledWith(
        mockHideNotificationAction('notif-123')
      )
    })
  })

  describe('Hook return values', () => {
    it('should expose hideNotification and notifications', () => {
      const { result } = renderHook(() => useContainer())

      expect(result.current).toHaveProperty('hideNotification')
      expect(result.current).toHaveProperty('notifications')
      expect(typeof result.current.hideNotification).toBe('function')
      expect(Array.isArray(result.current.notifications)).toBe(true)
    })
  })
})
