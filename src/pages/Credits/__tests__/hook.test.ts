import { act, renderHook } from '@testing-library/react'
import { useParams } from 'react-router-dom'
import { mockPersonDetails } from 'src/__mocks__/mockPerson'
import { useGetPersonDetailsQuery } from 'src/store/features/person'
import errorMessage from 'src/utils/helpers/errorMessage'
import getSlug from 'src/utils/helpers/getSlug'

import useContainer from '../hook'
import { FilterOptions } from '../types'

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}))
jest.mock('src/store/features/person')
jest.mock('src/utils/helpers/errorMessage')
jest.mock('src/utils/helpers/getSlug')

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>
const mockUseGetPersonDetailsQuery =
  useGetPersonDetailsQuery as jest.MockedFunction<
    typeof useGetPersonDetailsQuery
  >
const mockErrorMessage = errorMessage as jest.MockedFunction<
  typeof errorMessage
>
const mockGetSlug = getSlug as jest.MockedFunction<typeof getSlug>

describe('Credits useContainer hook', () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ personSlug: '1234-darth-maul' } as never)
    mockUseGetPersonDetailsQuery.mockReturnValue({
      data: mockPersonDetails,
      error: null,
      isLoading: false,
    } as never)
    mockErrorMessage.mockImplementation(err => (err ? 'Mocked Error' : null))
    mockGetSlug.mockImplementation(
      (id: number | string, title: string) => `${id}-${title}`
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return correct values and call query with parsed person id', () => {
    const { result } = renderHook(() => useContainer())

    expect(result.current.person).toEqual(mockPersonDetails)
    expect(result.current.personSlug).toBe('1234-darth-maul')
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()

    expect(mockUseGetPersonDetailsQuery).toHaveBeenCalledWith(1234)
  })

  it('should build dataSource for All filter (cast + crew)', () => {
    const { result } = renderHook(() => useContainer())

    expect(result.current.dataSource.length).toBe(
      mockPersonDetails.movie_credits.cast.length +
        mockPersonDetails.movie_credits.crew.length
    )
    // Ensure slug builder used
    expect(mockGetSlug).toHaveBeenCalled()
  })

  it('should switch to Cast filter', () => {
    const { result } = renderHook(() => useContainer())

    act(() => {
      result.current.handleChangeFilter(FilterOptions.Cast)
    })

    expect(result.current.dataSource.length).toBe(
      mockPersonDetails.movie_credits.cast.length
    )
  })

  it('should switch to Crew filter', () => {
    const { result } = renderHook(() => useContainer())

    act(() => {
      result.current.handleChangeFilter(FilterOptions.Crew)
    })

    expect(result.current.dataSource.length).toBe(
      mockPersonDetails.movie_credits.crew.length
    )
  })

  it('should reflect loading state', () => {
    mockUseGetPersonDetailsQuery.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    } as never)

    const { result } = renderHook(() => useContainer())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.person).toBeUndefined()
    expect(result.current.dataSource).toEqual([])
  })

  it('should map error using errorMessage helper', () => {
    const apiError = { status: 500 } as never
    mockUseGetPersonDetailsQuery.mockReturnValue({
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
    mockUseParams.mockReturnValue({ personSlug: '5678-someone' } as never)

    renderHook(() => useContainer())

    expect(mockUseGetPersonDetailsQuery).toHaveBeenCalledWith(5678)
  })
})
