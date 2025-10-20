import { renderHook } from '@testing-library/react'
import { MappingAlgorithm } from 'antd'
import { selectTheme } from 'src/store/features/app'
import { useAppSelector } from 'src/store/hooks'

import useContainer from '../hook'

jest.mock('antd', () => {
  const createAlgorithm = (label: string) =>
    Object.assign(jest.fn(), { label }) as unknown as MappingAlgorithm

  return {
    theme: {
      darkAlgorithm: createAlgorithm('dark'),
      defaultAlgorithm: createAlgorithm('default'),
    },
  }
})

const getAlgorithms = () =>
  (
    jest.requireMock('antd') as {
      theme: {
        darkAlgorithm: MappingAlgorithm
        defaultAlgorithm: MappingAlgorithm
      }
    }
  ).theme

jest.mock('src/store/features/app')
jest.mock('src/store/hooks')

const mockUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>
const mockSelectTheme = selectTheme as jest.MockedFunction<typeof selectTheme>

describe('ThemeProvider useContainer hook', () => {
  beforeEach(() => {
    mockUseAppSelector.mockReturnValue('light')
    mockSelectTheme.mockReturnValue('light')
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
    it('should return default algorithm and isDark false when theme is light', () => {
      const { result } = renderHook(() => useContainer())
      const { defaultAlgorithm } = getAlgorithms()

      expect(result.current.algorithm).toBe(defaultAlgorithm)
      expect(result.current.isDark).toBe(false)
    })

    it('should return dark algorithm and isDark true when theme is dark', () => {
      mockUseAppSelector.mockReturnValue('dark')
      mockSelectTheme.mockReturnValue('dark')

      const { result } = renderHook(() => useContainer())
      const { darkAlgorithm } = getAlgorithms()

      expect(result.current.algorithm).toBe(darkAlgorithm)
      expect(result.current.isDark).toBe(true)
    })

    it('should reflect theme changes across rerenders', () => {
      mockUseAppSelector
        .mockReturnValueOnce('light')
        .mockReturnValueOnce('dark')

      const { rerender, result } = renderHook(() => useContainer())
      const { darkAlgorithm, defaultAlgorithm } = getAlgorithms()

      expect(result.current.algorithm).toBe(defaultAlgorithm)
      expect(result.current.isDark).toBe(false)

      rerender()

      expect(result.current.algorithm).toBe(darkAlgorithm)
      expect(result.current.isDark).toBe(true)
    })
  })
})
