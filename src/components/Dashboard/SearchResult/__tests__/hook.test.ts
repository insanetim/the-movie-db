import { renderHook } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'
import { useGetSearchMoviesQuery } from 'src/store/features/movie'
import { useAppSelector } from 'src/store/hooks'
import errorMessage from 'src/utils/helpers/errorMessage'
import getParams from 'src/utils/helpers/getParams'

import useContainer from '../hook'
import { SearchResultHookProps } from '../types'

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}))

jest.mock('src/store/features/movie')
jest.mock('src/store/hooks')
jest.mock('src/utils/helpers/errorMessage')
jest.mock('src/utils/helpers/getParams')

const mockUseSearchParams = useSearchParams as jest.MockedFunction<
  typeof useSearchParams
>
const mockUseGetSearchMoviesQuery =
  useGetSearchMoviesQuery as jest.MockedFunction<typeof useGetSearchMoviesQuery>
const mockUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>
const mockErrorMessage = errorMessage as jest.MockedFunction<
  typeof errorMessage
>
const mockGetParams = getParams as jest.MockedFunction<typeof getParams>

describe('SearchResult useContainer hook', () => {
  const mockSetSearchParams = jest.fn()
  const mockSearchParamsGet = jest.fn()

  const defaultProps: SearchResultHookProps = {
    query: 'test query',
  }

  beforeEach(() => {
    mockSearchParamsGet.mockReturnValue('1')
    mockUseSearchParams.mockReturnValue([
      { get: mockSearchParamsGet } as never,
      mockSetSearchParams,
    ])
    mockUseGetSearchMoviesQuery.mockReturnValue({
      data: {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0,
      },
      error: null,
      isLoading: false,
    } as never)
    mockUseAppSelector.mockReturnValue(null)
    mockErrorMessage.mockImplementation(err => (err ? 'Mocked Error' : null))
    mockGetParams.mockImplementation(
      ({ page, search }: { page?: number | string; search?: string }) => {
        const params: { page?: string; search?: string } = {}
        if (search) params.search = search
        if (page && Number(page) > 1) params.page = String(page)
        return params
      }
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('URL parameter handling', () => {
    it('should get page from search params with fallback to "1"', () => {
      renderHook(() => useContainer(defaultProps))

      expect(mockSearchParamsGet).toHaveBeenCalledWith('page')
      expect(mockUseGetSearchMoviesQuery).toHaveBeenCalledWith({
        include_adult: undefined,
        page: '1',
        query: 'test query',
      })
    })

    it('should use provided page parameter from search params', () => {
      mockSearchParamsGet.mockReturnValue('3')

      renderHook(() => useContainer(defaultProps))

      expect(mockUseGetSearchMoviesQuery).toHaveBeenCalledWith({
        include_adult: undefined,
        page: '3',
        query: 'test query',
      })
    })

    it('should handle null page parameter', () => {
      mockSearchParamsGet.mockReturnValue(null)

      renderHook(() => useContainer(defaultProps))

      expect(mockUseGetSearchMoviesQuery).toHaveBeenCalledWith({
        include_adult: undefined,
        page: '1',
        query: 'test query',
      })
    })
  })

  describe('Account integration', () => {
    it('should use account include_adult setting when account exists', () => {
      const mockAccount = { include_adult: true }
      mockUseAppSelector.mockReturnValue(mockAccount)

      renderHook(() => useContainer(defaultProps))

      expect(mockUseGetSearchMoviesQuery).toHaveBeenCalledWith({
        include_adult: true,
        page: '1',
        query: 'test query',
      })
    })

    it('should use account include_adult setting when account exists and is false', () => {
      const mockAccount = { include_adult: false }
      mockUseAppSelector.mockReturnValue(mockAccount)

      renderHook(() => useContainer(defaultProps))

      expect(mockUseGetSearchMoviesQuery).toHaveBeenCalledWith({
        include_adult: false,
        page: '1',
        query: 'test query',
      })
    })

    it('should pass null for include_adult when no account', () => {
      mockUseAppSelector.mockReturnValue(null)

      renderHook(() => useContainer(defaultProps))

      expect(mockUseGetSearchMoviesQuery).toHaveBeenCalledWith({
        include_adult: undefined,
        page: '1',
        query: 'test query',
      })
    })
  })

  describe('API query integration', () => {
    it('should call useGetSearchMoviesQuery with correct parameters', () => {
      const mockAccount = { include_adult: true }
      mockUseAppSelector.mockReturnValue(mockAccount)
      mockSearchParamsGet.mockReturnValue('2')

      renderHook(() => useContainer({ query: 'matrix' }))

      expect(mockUseGetSearchMoviesQuery).toHaveBeenCalledWith({
        include_adult: true,
        page: '2',
        query: 'matrix',
      })
    })

    it('should return movies data from API query', () => {
      const mockMoviesData = {
        page: 1,
        results: [{ id: 1, title: 'Test Movie' }],
        total_pages: 5,
        total_results: 100,
      }
      mockUseGetSearchMoviesQuery.mockReturnValue({
        data: mockMoviesData,
        error: null,
        isLoading: false,
      } as never)

      const { result } = renderHook(() => useContainer(defaultProps))

      expect(result.current.movies).toEqual(mockMoviesData)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })

    it('should return loading state', () => {
      mockUseGetSearchMoviesQuery.mockReturnValue({
        data: undefined,
        error: null,
        isLoading: true,
      } as never)

      const { result } = renderHook(() => useContainer(defaultProps))

      expect(result.current.isLoading).toBe(true)
      expect(result.current.movies).toBeUndefined()
    })

    it('should handle and process API errors', () => {
      const mockError = { data: { message: 'Server error' }, status: 500 }
      mockUseGetSearchMoviesQuery.mockReturnValue({
        data: undefined,
        error: mockError,
        isLoading: false,
      } as never)
      mockErrorMessage.mockReturnValue('Server error')

      const { result } = renderHook(() => useContainer(defaultProps))

      expect(result.current.error).toBe('Server error')
      expect(mockErrorMessage).toHaveBeenCalledWith(mockError)
    })
  })

  describe('Pagination handler', () => {
    it('should call setSearchParams with correct parameters when handlePagination is called', () => {
      const { result } = renderHook(() => useContainer(defaultProps))

      result.current.handlePagination(3)

      expect(mockGetParams).toHaveBeenCalledWith({
        page: 3,
        search: 'test query',
      })
      expect(mockSetSearchParams).toHaveBeenCalledWith({
        page: '3',
        search: 'test query',
      })
    })

    it('should handle pagination with different page numbers', () => {
      const { result } = renderHook(() =>
        useContainer({ query: 'different query' })
      )

      result.current.handlePagination(5)

      expect(mockGetParams).toHaveBeenCalledWith({
        page: 5,
        search: 'different query',
      })
    })

    it('should handle edge case page numbers', () => {
      const { result } = renderHook(() => useContainer(defaultProps))

      result.current.handlePagination(1)
      result.current.handlePagination(100)
      result.current.handlePagination(0)

      expect(mockGetParams).toHaveBeenCalledWith({
        page: 1,
        search: 'test query',
      })
      expect(mockGetParams).toHaveBeenCalledWith({
        page: 100,
        search: 'test query',
      })
      expect(mockGetParams).toHaveBeenCalledWith({
        page: 0,
        search: 'test query',
      })
    })
  })

  describe('Hook return values', () => {
    it('should return all required properties', () => {
      const { result } = renderHook(() => useContainer(defaultProps))

      expect(result.current).toHaveProperty('movies')
      expect(result.current).toHaveProperty('isLoading')
      expect(result.current).toHaveProperty('error')
      expect(result.current).toHaveProperty('handlePagination')
      expect(typeof result.current.handlePagination).toBe('function')
    })

    it('should handle empty query', () => {
      renderHook(() => useContainer({ query: '' }))

      expect(mockUseGetSearchMoviesQuery).toHaveBeenCalledWith({
        include_adult: undefined,
        page: '1',
        query: '',
      })
    })

    it('should handle special characters in query', () => {
      renderHook(() => useContainer({ query: 'test & special "characters"' }))

      expect(mockUseGetSearchMoviesQuery).toHaveBeenCalledWith({
        include_adult: undefined,
        page: '1',
        query: 'test & special "characters"',
      })
    })
  })
})
