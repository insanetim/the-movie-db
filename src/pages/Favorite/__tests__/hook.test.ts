import { act, renderHook } from '@testing-library/react'
import { Modal } from 'antd'
import { MouseEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import useHandleError from 'src/hooks/useHandleError'
import useUpdatePage from 'src/hooks/useUpdatePage'
import {
  useAddToFavoriteMutation,
  useGetFavoriteMoviesQuery,
} from 'src/store/features/favorite'
import { useAppSelector } from 'src/store/hooks'
import errorMessage from 'src/utils/helpers/errorMessage'
import getParams from 'src/utils/helpers/getParams'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}))
jest.mock('src/store/features/favorite')
jest.mock('src/store/hooks')
jest.mock('src/hooks/useUpdatePage')
jest.mock('src/hooks/useHandleError')
jest.mock('src/utils/helpers/errorMessage')
jest.mock('src/utils/helpers/getParams')

const mockUseSearchParams = useSearchParams as jest.MockedFunction<
  typeof useSearchParams
>
const mockUseGetFavoriteMoviesQuery =
  useGetFavoriteMoviesQuery as jest.MockedFunction<
    typeof useGetFavoriteMoviesQuery
  >
const mockUseAddToFavoriteMutation =
  useAddToFavoriteMutation as jest.MockedFunction<
    typeof useAddToFavoriteMutation
  >
const mockUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>
const mockUseUpdatePage = useUpdatePage as jest.MockedFunction<
  typeof useUpdatePage
>
const mockUseHandleError = useHandleError as jest.MockedFunction<
  typeof useHandleError
>
const mockErrorMessage = errorMessage as jest.MockedFunction<
  typeof errorMessage
>
const mockGetParams = getParams as jest.MockedFunction<typeof getParams>

describe('Favorite useContainer hook', () => {
  let setSearchParams: jest.Mock
  let mockGet: jest.Mock
  let triggerAddToFavorite: jest.Mock
  let unwrapSuccess: jest.Mock
  let unwrapReject: jest.Mock
  let updatePage: jest.Mock
  let handleError: jest.Mock

  const modalSpy = jest.spyOn(Modal, 'confirm')

  beforeEach(() => {
    mockGet = jest.fn().mockReturnValue('1')
    setSearchParams = jest.fn()
    mockUseSearchParams.mockReturnValue([
      { get: mockGet } as never,
      setSearchParams as never,
    ] as never)

    mockUseAppSelector.mockImplementation(() => ({ id: '1' }) as never)

    mockErrorMessage.mockImplementation(err => (err ? 'Mocked Error' : null))
    mockGetParams.mockImplementation(
      ({ page, search }: { page?: number | string; search?: string }) => {
        const params: { page?: string; search?: string } = {}
        if (search) params.search = search
        if (page && Number(page) > 1) params.page = String(page)
        return params
      }
    )

    const movies = { results: [{ id: 10 }] } as never
    mockUseGetFavoriteMoviesQuery.mockReturnValue({
      data: movies,
      error: null,
      isLoading: false,
    } as never)

    updatePage = jest.fn()
    mockUseUpdatePage.mockReturnValue({ updatePage } as never)

    handleError = jest.fn()
    mockUseHandleError.mockReturnValue({ handleError } as never)

    unwrapSuccess = jest.fn().mockResolvedValue(undefined)
    unwrapReject = jest.fn().mockRejectedValue('some-error')
    triggerAddToFavorite = jest.fn().mockReturnValue({ unwrap: unwrapSuccess })
    mockUseAddToFavoriteMutation.mockReturnValue([
      triggerAddToFavorite,
    ] as never)
  })

  it('should skip query when account is missing', () => {
    mockUseAppSelector.mockImplementation(() => undefined as never)
    const { result } = renderHook(() => useContainer())

    expect(result.current.isLoading).toBe(false)
    expect(mockUseGetFavoriteMoviesQuery).toHaveBeenCalledWith('1', {
      skip: true,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return values and call query with page and proper skip option', () => {
    const { result } = renderHook(() => useContainer())

    expect(result.current.isLoading).toBe(false)
    expect(result.current.movies).toEqual({ results: [{ id: 10 }] })
    expect(result.current.error).toBeNull()

    expect(mockUseGetFavoriteMoviesQuery).toHaveBeenCalledWith('1', {
      skip: false,
    })
  })

  it('should default page to "1" when search param is missing', () => {
    mockGet.mockReturnValue(null)

    renderHook(() => useContainer())

    expect(mockUseGetFavoriteMoviesQuery).toHaveBeenCalledWith('1', {
      skip: false,
    })
  })

  it('should reflect loading state', () => {
    mockUseGetFavoriteMoviesQuery.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    } as never)

    const { result } = renderHook(() => useContainer())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.movies).toBeUndefined()
  })

  it('should map error using errorMessage helper', () => {
    const apiError = { status: 500 } as never
    mockUseGetFavoriteMoviesQuery.mockReturnValue({
      data: undefined,
      error: apiError,
      isLoading: false,
    } as never)
    mockErrorMessage.mockReturnValue('Some error')

    const { result } = renderHook(() => useContainer())

    expect(mockErrorMessage).toHaveBeenCalledWith(apiError)
    expect(result.current.error).toBe('Some error')
  })

  it('should update search params on pagination', () => {
    const { result } = renderHook(() => useContainer())

    act(() => {
      result.current.handlePagination(3)
    })

    expect(mockGetParams).toHaveBeenCalledWith({ page: 3 })
    expect(setSearchParams).toHaveBeenCalledWith({ page: '3' })
  })

  it('should confirm and delete movie successfully', async () => {
    const { result } = renderHook(() => useContainer())

    const event = {
      stopPropagation: jest.fn(),
    } as unknown as MouseEvent<HTMLSpanElement>

    act(() => {
      result.current.handleConfirmDeleteMovie(event, 1234)
    })

    expect(event.stopPropagation).toHaveBeenCalled()
    expect(modalSpy).toHaveBeenCalled()

    const args = (modalSpy as jest.Mock).mock.calls[0][0]
    expect(args.title).toBe('Do you want to delete movie from favorite?')
    expect(typeof args.onOk).toBe('function')

    await act(async () => {
      await args.onOk()
    })

    expect(triggerAddToFavorite).toHaveBeenCalledWith({
      inFavorite: false,
      movieId: 1234,
    })
    expect(unwrapSuccess).toHaveBeenCalled()
    expect(updatePage).toHaveBeenCalled()
  })

  it('should handle error when delete fails', async () => {
    mockUseHandleError.mockReturnValue({
      handleError: (handleError = jest.fn()),
    } as never)
    triggerAddToFavorite.mockReturnValue({ unwrap: unwrapReject })

    const { result } = renderHook(() => useContainer())

    await act(async () => {
      await result.current.handleDeleteMovie(9999)
    })

    expect(triggerAddToFavorite).toHaveBeenCalledWith({
      inFavorite: false,
      movieId: 9999,
    })
    expect(unwrapReject).toHaveBeenCalled()
    expect(handleError).toHaveBeenCalled()
  })
})
