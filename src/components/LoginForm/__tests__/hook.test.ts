import { renderHook } from '@testing-library/react'
import { selectThemeIsDark } from 'src/store/features/app'
import { useAppSelector } from 'src/store/hooks'

import useContainer from '../hook'

jest.mock('src/store/features/app')
jest.mock('src/store/hooks')

const mockUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>
const mockSelectThemeIsDark = selectThemeIsDark as jest.MockedFunction<
  typeof selectThemeIsDark
>

describe('LoginForm useContainer hook', () => {
  beforeEach(() => {
    mockUseAppSelector.mockReturnValue(false)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Redux integration', () => {
    it('should call useAppSelector with selectThemeIsDark', () => {
      renderHook(() => useContainer())

      expect(mockUseAppSelector).toHaveBeenCalledWith(mockSelectThemeIsDark)
    })
  })

  describe('Return values', () => {
    it('should return isDark false when selector returns false', () => {
      const { result } = renderHook(() => useContainer())

      expect(result.current.isDark).toBe(false)
    })

    it('should return isDark true when selector returns true', () => {
      mockUseAppSelector.mockReturnValue(true)

      const { result } = renderHook(() => useContainer())

      expect(result.current.isDark).toBe(true)
    })

    it('should reflect theme changes across rerenders', () => {
      mockUseAppSelector
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)

      const { rerender, result } = renderHook(() => useContainer())

      expect(result.current.isDark).toBe(false)

      rerender()

      expect(result.current.isDark).toBe(true)
    })
  })
})
