import { renderHook } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'
import { useGetTrendingMoviesQuery } from 'src/store/features/movie'
import errorMessage from 'src/utils/helpers/errorMessage'
import getInterval from 'src/utils/helpers/getInterval'
import getParams from 'src/utils/helpers/getParams'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}))

jest.mock('src/store/features/movie')
jest.mock('src/utils/helpers/errorMessage')
jest.mock('src/utils/helpers/getInterval')
jest.mock('src/utils/helpers/getParams')

const mockUseSearchParams = useSearchParams as jest.MockedFunction<
  typeof useSearchParams
>
const mockUseGetTrendingMoviesQuery =
  useGetTrendingMoviesQuery as jest.MockedFunction<
    typeof useGetTrendingMoviesQuery
  >
const mockErrorMessage = errorMessage as jest.MockedFunction<
  typeof errorMessage
>
const mockGetInterval = getInterval as jest.MockedFunction<typeof getInterval>
const mockGetParams = getParams as jest.MockedFunction<typeof getParams>

describe('Trending useContainer hook', () => {
  const mockSetSearchParams = jest.fn()
  const mockSearchParamsGet = jest.fn()

  beforeEach(() => {
    mockSearchParamsGet.mockReturnValue('1')
    mockUseSearchParams.mockReturnValue([
      { get: mockSearchParamsGet } as never,
      mockSetSearchParams,
    ])
    mockUseGetTrendingMoviesQuery.mockReturnValue({
      data: {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 0,
      },
      error: null,
      isLoading: false,
    } as never)
    mockErrorMessage.mockImplementation(err => (err ? 'Mocked Error' : null))
    mockGetInterval.mockReturnValue(600000) // 10 minutes in milliseconds
    mockGetParams.mockImplementation(({ page }: { page?: number | string }) => {
      const params: { page?: string } = {}
      if (page && Number(page) > 1) params.page = String(page)
      return params
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('URL parameter handling', () => {
    it('should get page from search params with fallback to "1"', () => {
      renderHook(() => useContainer())

      expect(mockSearchParamsGet).toHaveBeenCalledWith('page')
      expect(mockUseGetTrendingMoviesQuery).toHaveBeenCalledWith('1', {
        pollingInterval: 600000,
        skipPollingIfUnfocused: true,
      })
    })

    it('should use provided page parameter from search params', () => {
      mockSearchParamsGet.mockReturnValue('3')

      renderHook(() => useContainer())

      expect(mockUseGetTrendingMoviesQuery).toHaveBeenCalledWith('3', {
        pollingInterval: 600000,
        skipPollingIfUnfocused: true,
      })
    })

    it('should handle null page parameter', () => {
      mockSearchParamsGet.mockReturnValue(null)

      renderHook(() => useContainer())

      expect(mockUseGetTrendingMoviesQuery).toHaveBeenCalledWith('1', {
        pollingInterval: 600000,
        skipPollingIfUnfocused: true,
      })
    })
  })

  describe('API query integration', () => {
    it('should call useGetTrendingMoviesQuery with correct parameters and polling config', () => {
      renderHook(() => useContainer())

      expect(mockUseGetTrendingMoviesQuery).toHaveBeenCalledWith('1', {
        pollingInterval: 600000,
        skipPollingIfUnfocused: true,
      })
      expect(mockGetInterval).toHaveBeenCalledWith(10, 'minutes')
    })

    it('should return movies data from API query', () => {
      const mockMoviesData = {
        page: 1,
        results: [{ id: 1, title: 'Test Movie' }],
        total_pages: 5,
        total_results: 100,
      }
      mockUseGetTrendingMoviesQuery.mockReturnValue({
        data: mockMoviesData,
        error: null,
        isLoading: false,
      } as never)

      const { result } = renderHook(() => useContainer())

      expect(result.current.movies).toEqual(mockMoviesData)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })

    it('should return loading state', () => {
      mockUseGetTrendingMoviesQuery.mockReturnValue({
        data: undefined,
        error: null,
        isLoading: true,
      } as never)

      const { result } = renderHook(() => useContainer())

      expect(result.current.isLoading).toBe(true)
      expect(result.current.movies).toBeUndefined()
    })

    it('should handle and process API errors', () => {
      const mockError = { data: { message: 'Server error' }, status: 500 }
      mockUseGetTrendingMoviesQuery.mockReturnValue({
        data: undefined,
        error: mockError,
        isLoading: false,
      } as never)
      mockErrorMessage.mockReturnValue('Server error')

      const { result } = renderHook(() => useContainer())

      expect(result.current.error).toBe('Server error')
      expect(mockErrorMessage).toHaveBeenCalledWith(mockError)
    })
  })

  describe('Pagination handler', () => {
    it('should call setSearchParams with correct parameters when handlePagination is called', () => {
      const { result } = renderHook(() => useContainer())

      result.current.handlePagination(3)

      expect(mockGetParams).toHaveBeenCalledWith({ page: 3 })
      expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '3' })
    })

    it('should handle pagination with different page numbers', () => {
      const { result } = renderHook(() => useContainer())

      result.current.handlePagination(5)

      expect(mockGetParams).toHaveBeenCalledWith({ page: 5 })
      expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '5' })
    })

    it('should handle edge case page numbers', () => {
      const { result } = renderHook(() => useContainer())

      result.current.handlePagination(1)
      result.current.handlePagination(100)
      result.current.handlePagination(0)

      expect(mockGetParams).toHaveBeenCalledWith({ page: 1 })
      expect(mockGetParams).toHaveBeenCalledWith({ page: 100 })
      expect(mockGetParams).toHaveBeenCalledWith({ page: 0 })
    })
  })

  describe('Hook return values', () => {
    it('should return all required properties', () => {
      const { result } = renderHook(() => useContainer())

      expect(result.current).toHaveProperty('movies')
      expect(result.current).toHaveProperty('isLoading')
      expect(result.current).toHaveProperty('error')
      expect(result.current).toHaveProperty('handlePagination')
      expect(typeof result.current.handlePagination).toBe('function')
    })
  })
})
