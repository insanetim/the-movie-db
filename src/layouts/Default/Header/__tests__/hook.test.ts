import { act, renderHook } from '@testing-library/react'
import { useLocation, useNavigate } from 'react-router-dom'
import useScrollToTop from 'src/hooks/useScrollToTop'
import {
  selectAccount,
  selectSessionId,
  useDeleteSessionMutation,
  useGetAccountQuery,
} from 'src/store/features/auth'
import { useAppSelector } from 'src/store/hooks'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}))

jest.mock('src/hooks/useScrollToTop')
jest.mock('src/store/features/auth')
jest.mock('src/store/hooks')

const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>
const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>
const mockUseScrollToTop = useScrollToTop as jest.MockedFunction<
  typeof useScrollToTop
>
const mockUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>
const mockUseGetAccountQuery = useGetAccountQuery as jest.MockedFunction<
  typeof useGetAccountQuery
>
const mockUseDeleteSessionMutation =
  useDeleteSessionMutation as jest.MockedFunction<
    typeof useDeleteSessionMutation
  >

describe('useContainer', () => {
  let mockNavigate: jest.Mock
  let mockDeleteSession: jest.Mock

  const mockLocation = {
    hash: '',
    key: 'test-key',
    pathname: '/',
    search: '',
    state: null,
  }

  const mockAccount = {
    id: 123,
    name: 'Test User',
    username: 'testuser',
  }

  const mockSessionId = 'test-session-id'

  beforeEach(() => {
    mockNavigate = jest.fn()
    mockDeleteSession = jest.fn()

    mockUseLocation.mockReturnValue(mockLocation)
    mockUseNavigate.mockReturnValue(mockNavigate)
    mockUseScrollToTop.mockImplementation(() => {})
    mockUseDeleteSessionMutation.mockReturnValue([mockDeleteSession] as never)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return correct values and functions', () => {
    // Arrange
    mockUseAppSelector.mockImplementation(selector => {
      if (selector === selectAccount) return mockAccount
      if (selector === selectSessionId) return mockSessionId
      return undefined
    })

    mockUseGetAccountQuery.mockReturnValue({} as never)

    // Act
    const { result } = renderHook(() => useContainer())

    // Assert
    expect(result.current.account).toEqual(mockAccount)
    expect(result.current.sessionId).toBe(mockSessionId)
    expect(result.current.handleLogin).toBeInstanceOf(Function)
    expect(result.current.handleLogout).toBeInstanceOf(Function)
    expect(mockUseScrollToTop).toHaveBeenCalled()
    expect(mockUseGetAccountQuery).toHaveBeenCalledWith(mockSessionId, {
      skip: false,
    })
  })

  it('should skip useGetAccountQuery when sessionId is not available', () => {
    // Arrange
    mockUseAppSelector.mockImplementation(selector => {
      if (selector === selectAccount) return null
      if (selector === selectSessionId) return null
      return undefined
    })

    // Act
    renderHook(() => useContainer())

    // Assert
    expect(mockUseGetAccountQuery).toHaveBeenCalledWith(null, { skip: true })
  })

  describe('handleLogin', () => {
    it('should navigate to login page with correct state', () => {
      // Arrange
      mockUseAppSelector.mockImplementation(selector => {
        if (selector === selectAccount) return null
        if (selector === selectSessionId) return null
        return undefined
      })

      const { result } = renderHook(() => useContainer())

      // Act
      act(() => {
        result.current.handleLogin()
      })

      // Assert
      expect(mockNavigate).toHaveBeenCalledWith('/login', {
        state: { from: mockLocation },
      })
    })
  })

  describe('handleLogout', () => {
    it('should call deleteSession and navigate when sessionId exists', () => {
      // Arrange
      mockUseAppSelector.mockImplementation(selector => {
        if (selector === selectAccount) return mockAccount
        if (selector === selectSessionId) return mockSessionId
        return undefined
      })

      const { result } = renderHook(() => useContainer())

      // Act
      act(() => {
        result.current.handleLogout()
      })

      // Assert
      expect(mockDeleteSession).toHaveBeenCalledWith({
        session_id: mockSessionId,
      })
      expect(mockNavigate).toHaveBeenCalledWith('/login', {
        replace: true,
        state: { from: mockLocation },
      })
    })

    it('should not call deleteSession when sessionId is null', () => {
      // Arrange
      mockUseAppSelector.mockImplementation(selector => {
        if (selector === selectAccount) return mockAccount
        if (selector === selectSessionId) return null
        return undefined
      })

      const { result } = renderHook(() => useContainer())

      // Act
      act(() => {
        result.current.handleLogout()
      })

      // Assert
      expect(mockDeleteSession).not.toHaveBeenCalled()
      expect(mockNavigate).not.toHaveBeenCalled()
    })

    it('should not call deleteSession nor navigate when sessionId is undefined', () => {
      // Arrange
      mockUseAppSelector.mockImplementation(selector => {
        if (selector === selectAccount) return mockAccount
        if (selector === selectSessionId) return undefined
        return undefined
      })

      const { result } = renderHook(() => useContainer())

      // Act
      act(() => {
        result.current.handleLogout()
      })

      // Assert
      expect(mockDeleteSession).not.toHaveBeenCalled()
      expect(mockNavigate).not.toHaveBeenCalled()
    })
  })

  it('should handle different location states in handleLogin', () => {
    // Arrange
    const customLocation = {
      ...mockLocation,
      pathname: '/movies/123',
      state: { some: 'state' },
    }

    mockUseLocation.mockReturnValue(customLocation)
    mockUseAppSelector.mockImplementation(selector => {
      if (selector === selectAccount) return mockAccount
      if (selector === selectSessionId) return mockSessionId
      return undefined
    })

    // Act
    const { result } = renderHook(() => useContainer())
    act(() => {
      result.current.handleLogin()
    })

    // Assert
    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('/login', {
      state: { from: customLocation },
    })
  })

  it('should handle different location states in handleLogout', () => {
    // Arrange
    const customLocation = {
      ...mockLocation,
      pathname: '/movies/123',
      state: { some: 'state' },
    }

    mockUseLocation.mockReturnValue(customLocation)
    mockUseAppSelector.mockImplementation(selector => {
      if (selector === selectAccount) return mockAccount
      if (selector === selectSessionId) return mockSessionId
      return undefined
    })

    // Act
    const { result } = renderHook(() => useContainer())
    act(() => {
      result.current.handleLogout()
    })

    // Assert
    expect(mockDeleteSession).toHaveBeenCalledWith({
      session_id: mockSessionId,
    })
    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('/login', {
      replace: true,
      state: { from: customLocation },
    })
  })
})
