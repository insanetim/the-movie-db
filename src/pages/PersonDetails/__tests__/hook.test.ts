import { act, renderHook } from '@testing-library/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPersonDetailsQuery } from 'src/store/features/person'
import errorMessage from 'src/utils/helpers/errorMessage'
import getIdFromSlug from 'src/utils/helpers/getIdFromSlug'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}))
jest.mock('src/store/features/person')
jest.mock('src/utils/helpers/errorMessage')
jest.mock('src/utils/helpers/getIdFromSlug')

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>
const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>
const mockUseGetPersonDetailsQuery =
  useGetPersonDetailsQuery as jest.MockedFunction<
    typeof useGetPersonDetailsQuery
  >
const mockErrorMessage = errorMessage as jest.MockedFunction<
  typeof errorMessage
>
const mockGetIdFromSlug = getIdFromSlug as jest.MockedFunction<
  typeof getIdFromSlug
>

describe('PersonDetails useContainer hook', () => {
  let navigate: jest.Mock

  beforeEach(() => {
    // router params and navigation
    mockUseParams.mockReturnValue({ personSlug: 'some-person-55' } as never)
    navigate = jest.fn()
    mockUseNavigate.mockReturnValue(navigate as never)
    mockGetIdFromSlug.mockReturnValue('55' as never)

    // helpers
    mockErrorMessage.mockImplementation(err => (err ? 'Mocked Error' : null))

    // api default
    const person = { id: 55, name: 'Some Person' } as never
    mockUseGetPersonDetailsQuery.mockReturnValue({
      data: person,
      error: null,
      isLoading: false,
    } as never)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return values and query by id from slug', () => {
    const { result } = renderHook(() => useContainer())

    expect(result.current.isLoading).toBe(false)
    expect(result.current.person).toEqual({ id: 55, name: 'Some Person' })
    expect(result.current.error).toBeNull()

    expect(mockGetIdFromSlug).toHaveBeenCalledWith('some-person-55')
    expect(mockUseGetPersonDetailsQuery).toHaveBeenCalledWith('55')
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

  it('should navigate to credits on handleGoToCredits', () => {
    const { result } = renderHook(() => useContainer())

    act(() => {
      result.current.handleGoToCredits()
    })

    expect(navigate).toHaveBeenCalledWith('credits')
  })
})
