import { renderHook } from '@testing-library/react'
import { useParams } from 'react-router-dom'
import { mockMovieDetailsExtended } from 'src/__mocks__/mockMovie'
import { useGetMovieDetailsQuery } from 'src/store/features/movie'
import errorMessage from 'src/utils/helpers/errorMessage'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}))

jest.mock('src/store/features/movie')
jest.mock('src/utils/helpers/errorMessage')

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>
const mockUseGetMovieDetailsQuery =
  useGetMovieDetailsQuery as jest.MockedFunction<typeof useGetMovieDetailsQuery>
const mockErrorMessage = errorMessage as jest.MockedFunction<
  typeof errorMessage
>

describe('Cast useContainer hook', () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ movieSlug: '1234-test-movie' } as never)
    mockUseGetMovieDetailsQuery.mockReturnValue({
      data: mockMovieDetailsExtended,
      error: null,
      isLoading: false,
    } as never)
    mockErrorMessage.mockImplementation(err => (err ? 'Mocked Error' : null))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return correct values and call query with parsed movie id', () => {
    const { result } = renderHook(() => useContainer())

    expect(result.current.movie).toEqual(mockMovieDetailsExtended)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.movieSlug).toBe('1234-test-movie')

    expect(mockUseGetMovieDetailsQuery).toHaveBeenCalledWith(1234)
  })

  it('should reflect loading state', () => {
    mockUseGetMovieDetailsQuery.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    } as never)

    const { result } = renderHook(() => useContainer())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.movie).toBeUndefined()
  })

  it('should map error using errorMessage helper', () => {
    const apiError = { status: 500 } as never
    mockUseGetMovieDetailsQuery.mockReturnValue({
      data: undefined,
      error: apiError,
      isLoading: false,
    } as never)
    mockErrorMessage.mockReturnValue('Some error')

    const { result } = renderHook(() => useContainer())

    expect(mockErrorMessage).toHaveBeenCalledWith(apiError)
    expect(result.current.error).toBe('Some error')
  })

  it('should parse different slugs and pass correct id to query', () => {
    mockUseParams.mockReturnValue({ movieSlug: '5678-another-movie' } as never)

    renderHook(() => useContainer())

    expect(mockUseGetMovieDetailsQuery).toHaveBeenCalledWith(5678)
  })
})
