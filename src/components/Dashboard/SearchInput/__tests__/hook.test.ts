import { act, renderHook } from '@testing-library/react'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import getParams from 'src/utils/helpers/getParams'

import useContainer from '../hook'
import { SearchInputHookProps } from '../types'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}))

jest.mock('src/utils/helpers/getParams')

const mockUseState = React.useState as jest.MockedFunction<
  typeof React.useState
>
const mockUseSearchParams = useSearchParams as jest.MockedFunction<
  typeof useSearchParams
>
const mockGetParams = getParams as jest.MockedFunction<typeof getParams>

describe('SearchInput useContainer hook', () => {
  const mockSetInputValue = jest.fn()
  const mockSetSearchParams = jest.fn()

  const defaultProps: SearchInputHookProps = {
    query: 'test query',
  }

  beforeEach(() => {
    mockUseState.mockReturnValue(['test query', mockSetInputValue])
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ])
    mockGetParams.mockImplementation(({ search }) => ({ search }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('State initialization', () => {
    it('should initialize inputValue with query prop', () => {
      renderHook(() => useContainer(defaultProps))

      expect(mockUseState).toHaveBeenCalledWith('test query')
    })

    it('should initialize with empty string when query is empty', () => {
      renderHook(() => useContainer({ query: '' }))

      expect(mockUseState).toHaveBeenCalledWith('')
    })
  })

  describe('handleChange functionality', () => {
    it('should update input value when handleChange is called', () => {
      mockUseState.mockReturnValue(['', mockSetInputValue])

      const { result } = renderHook(() => useContainer({ query: '' }))

      const mockEvent = {
        target: { value: 'new search' },
      } as React.ChangeEvent<HTMLInputElement>

      act(() => {
        result.current.handleChange(mockEvent)
      })

      expect(mockSetInputValue).toHaveBeenCalledWith('new search')
    })

    it('should handle different input values', () => {
      mockUseState.mockReturnValue(['', mockSetInputValue])

      const { result } = renderHook(() => useContainer({ query: '' }))

      const testCases = [
        'simple search',
        'search with spaces',
        'search-with-special-chars!@#$',
        '',
        '   ', // spaces only
      ]

      testCases.forEach(value => {
        const mockEvent = {
          target: { value },
        } as React.ChangeEvent<HTMLInputElement>

        act(() => {
          result.current.handleChange(mockEvent)
        })

        expect(mockSetInputValue).toHaveBeenCalledWith(value)
      })
    })
  })

  describe('handleSearch functionality', () => {
    it('should call setSearchParams with trimmed search value', () => {
      const { result } = renderHook(() => useContainer(defaultProps))

      act(() => {
        result.current.handleSearch('  test search  ')
      })

      expect(mockGetParams).toHaveBeenCalledWith({ search: 'test search' })
      expect(mockSetSearchParams).toHaveBeenCalledWith(
        { search: 'test search' },
        { replace: true }
      )
    })

    it('should handle empty search value', () => {
      const { result } = renderHook(() => useContainer(defaultProps))

      act(() => {
        result.current.handleSearch('')
      })

      expect(mockGetParams).toHaveBeenCalledWith({ search: '' })
      expect(mockSetSearchParams).toHaveBeenCalledWith(
        { search: '' },
        { replace: true }
      )
    })

    it('should handle search with only spaces', () => {
      const { result } = renderHook(() => useContainer(defaultProps))

      act(() => {
        result.current.handleSearch('   ')
      })

      expect(mockGetParams).toHaveBeenCalledWith({ search: '' })
      expect(mockSetSearchParams).toHaveBeenCalledWith(
        { search: '' },
        { replace: true }
      )
    })

    it('should handle various search terms', () => {
      const { result } = renderHook(() => useContainer(defaultProps))

      const searchTerms = [
        'movie',
        'action movie',
        'sci-fi thriller',
        'comedy',
        'drama series',
      ]

      searchTerms.forEach(term => {
        act(() => {
          result.current.handleSearch(term)
        })

        expect(mockGetParams).toHaveBeenCalledWith({ search: term })
        expect(mockSetSearchParams).toHaveBeenCalledWith(
          { search: term },
          { replace: true }
        )
      })
    })
  })

  describe('Hook return values', () => {
    it('should return all required properties', () => {
      const { result } = renderHook(() => useContainer(defaultProps))

      expect(result.current).toHaveProperty('handleChange')
      expect(result.current).toHaveProperty('handleSearch')
      expect(result.current).toHaveProperty('inputValue')
      expect(typeof result.current.handleChange).toBe('function')
      expect(typeof result.current.handleSearch).toBe('function')
      expect(typeof result.current.inputValue).toBe('string')
    })

    it('should return current inputValue from state', () => {
      mockUseState.mockReturnValue(['current value', mockSetInputValue])

      const { result } = renderHook(() => useContainer(defaultProps))

      expect(result.current.inputValue).toBe('current value')
    })
  })

  describe('Integration with useSearchParams', () => {
    it('should get setSearchParams from useSearchParams hook', () => {
      renderHook(() => useContainer(defaultProps))

      expect(mockUseSearchParams).toHaveBeenCalled()
    })

    it('should use the setter function from useSearchParams', () => {
      const { result } = renderHook(() => useContainer(defaultProps))

      act(() => {
        result.current.handleSearch('test')
      })

      expect(mockSetSearchParams).toHaveBeenCalled()
    })
  })

  describe('Edge cases', () => {
    it('should handle undefined query prop', () => {
      renderHook(() => useContainer({ query: undefined as never }))

      expect(mockUseState).toHaveBeenCalledWith(undefined)
    })

    it('should handle null query prop', () => {
      renderHook(() => useContainer({ query: null as never }))

      expect(mockUseState).toHaveBeenCalledWith(null)
    })

    it('should handle special characters in search', () => {
      const { result } = renderHook(() => useContainer(defaultProps))

      const specialSearch = 'test & special "characters" with émojis 🚀'

      act(() => {
        result.current.handleSearch(specialSearch)
      })

      expect(mockGetParams).toHaveBeenCalledWith({ search: specialSearch })
      expect(mockSetSearchParams).toHaveBeenCalledWith(
        { search: specialSearch },
        { replace: true }
      )
    })
  })
})
