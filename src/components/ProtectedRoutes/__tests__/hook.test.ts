import { renderHook } from '@testing-library/react'
import { Location, useLocation } from 'react-router-dom'
import { selectSessionId } from 'src/store/features/auth'
import { useAppSelector } from 'src/store/hooks'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}))

jest.mock('src/store/features/auth')
jest.mock('src/store/hooks')

const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>
const mockUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>
const mockSelectSessionId = selectSessionId as jest.MockedFunction<
  typeof selectSessionId
>

describe('ProtectedRoutes useContainer hook', () => {
  const mockLocation: Location = {
    hash: '',
    key: 'mock-key',
    pathname: '/protected',
    search: '?foo=bar',
    state: { from: '/login' },
  }

  beforeEach(() => {
    mockUseLocation.mockReturnValue(mockLocation)
    mockUseAppSelector.mockReturnValue('session-123')
    mockSelectSessionId.mockReturnValue('session-123')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Redux integration', () => {
    it('should call useAppSelector with selectSessionId', () => {
      renderHook(() => useContainer())

      expect(mockUseAppSelector).toHaveBeenCalledWith(mockSelectSessionId)
    })
  })

  describe('Return values', () => {
    it('should expose location from useLocation and sessionId from selector', () => {
      const { result } = renderHook(() => useContainer())

      expect(result.current.location).toBe(mockLocation)
      expect(result.current.sessionId).toBe('session-123')
    })

    it('should reflect updated sessionId values on rerender', () => {
      mockUseAppSelector
        .mockReturnValueOnce('session-123')
        .mockReturnValueOnce('session-456')

      const { rerender, result } = renderHook(() => useContainer())

      expect(result.current.sessionId).toBe('session-123')

      rerender()

      expect(result.current.sessionId).toBe('session-456')
    })
  })
})
