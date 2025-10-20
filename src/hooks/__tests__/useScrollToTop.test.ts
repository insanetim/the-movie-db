import type { Location } from 'react-router-dom'

import { act } from '@testing-library/react'
import { useLocation } from 'react-router-dom'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useScrollToTop from '../useScrollToTop'

jest.useFakeTimers()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}))

const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>
const scrollToSpy: typeof window.scrollTo = jest.fn()

Object.defineProperty(window, 'scrollTo', {
  configurable: true,
  value: scrollToSpy,
})

const createLocation = (overrides: Partial<Location> = {}): Location => ({
  hash: '',
  key: 'mock-key',
  pathname: '/',
  search: '',
  state: null,
  ...overrides,
})

describe('useScrollToTop', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should call "scrollTo" method', () => {
    let currentPathname = '/'

    mockUseLocation.mockImplementation(() =>
      createLocation({ pathname: currentPathname })
    )

    const { rerender } = renderHookWithWrapper(useScrollToTop)

    act(() => {
      jest.runAllTimers()
    })

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0)
    expect(scrollToSpy).toHaveBeenCalledTimes(1)

    currentPathname = '/next'
    rerender()

    act(() => {
      jest.runOnlyPendingTimers()
    })

    expect(scrollToSpy).toHaveBeenCalledTimes(2)
  })

  it('should clear timeout on cleanup', () => {
    mockUseLocation.mockReturnValue(createLocation({ pathname: '/' }))

    const clearTimeoutSpy = jest.spyOn(globalThis, 'clearTimeout')
    const setTimeoutSpy = jest.spyOn(globalThis, 'setTimeout')

    const { unmount } = renderHookWithWrapper(useScrollToTop)

    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 0)

    unmount()

    expect(clearTimeoutSpy).toHaveBeenCalledWith(expect.any(Number))
  })
})
