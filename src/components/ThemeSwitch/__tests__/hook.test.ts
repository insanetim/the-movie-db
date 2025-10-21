import { act, renderHook } from '@testing-library/react'
import { selectTheme, setTheme, Theme } from 'src/store/features/app'
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
const mockSelectTheme = selectTheme as jest.MockedFunction<typeof selectTheme>
const mockSetTheme = setTheme as jest.MockedFunction<typeof setTheme>

describe('ThemeSwitch useContainer hook', () => {
  const mockDispatch = jest.fn()

  beforeEach(() => {
    mockUseAppDispatch.mockReturnValue(mockDispatch)
    mockUseAppSelector.mockReturnValue('light')
    mockSelectTheme.mockReturnValue('light')
    mockSetTheme.mockImplementation(value => ({
      payload: value,
      type: 'app/setTheme',
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Redux integration', () => {
    it('should call useAppSelector with selectTheme', () => {
      renderHook(() => useContainer())

      expect(mockUseAppSelector).toHaveBeenCalledWith(mockSelectTheme)
    })
  })

  describe('Return values', () => {
    it('should expose currentTheme from selector', () => {
      const { result } = renderHook(() => useContainer())

      expect(result.current.currentTheme).toBe('light')
    })

    it('should reflect updated theme on rerender', () => {
      mockUseAppSelector
        .mockReturnValueOnce('light')
        .mockReturnValueOnce('dark')

      const { rerender, result } = renderHook(() => useContainer())

      expect(result.current.currentTheme).toBe('light')

      rerender()

      expect(result.current.currentTheme).toBe('dark')
    })
  })

  describe('handleChange', () => {
    it('should dispatch setTheme with provided value', () => {
      const { result } = renderHook(() => useContainer())
      const nextTheme: Theme = 'dark'

      act(() => {
        result.current.handleChange(nextTheme)
      })

      expect(mockDispatch).toHaveBeenCalledTimes(1)
      expect(mockDispatch).toHaveBeenCalledWith(mockSetTheme(nextTheme))
    })
  })
})
