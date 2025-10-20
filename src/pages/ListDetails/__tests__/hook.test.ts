import { act, renderHook } from '@testing-library/react'
import { Modal } from 'antd'
import { MouseEvent } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useHandleError from 'src/hooks/useHandleError'
import useUpdatePage from 'src/hooks/useUpdatePage'
import {
  useDeleteListMutation,
  useGetListDetailsQuery,
  useRemoveMovieFromListMutation,
} from 'src/store/features/list'
import errorMessage from 'src/utils/helpers/errorMessage'
import getIdFromSlug from 'src/utils/helpers/getIdFromSlug'
import getParams from 'src/utils/helpers/getParams'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
  useSearchParams: jest.fn(),
}))
jest.mock('src/store/features/list')
jest.mock('src/hooks/useUpdatePage')
jest.mock('src/hooks/useHandleError')
jest.mock('src/utils/helpers/errorMessage')
jest.mock('src/utils/helpers/getIdFromSlug')
jest.mock('src/utils/helpers/getParams')

const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>
const mockUseParams = useParams as jest.MockedFunction<typeof useParams>
const mockUseSearchParams = useSearchParams as jest.MockedFunction<
  typeof useSearchParams
>
const mockUseGetListDetailsQuery =
  useGetListDetailsQuery as jest.MockedFunction<typeof useGetListDetailsQuery>
const mockUseDeleteListMutation = useDeleteListMutation as jest.MockedFunction<
  typeof useDeleteListMutation
>
const mockUseRemoveMovieFromListMutation =
  useRemoveMovieFromListMutation as jest.MockedFunction<
    typeof useRemoveMovieFromListMutation
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
const mockGetIdFromSlug = getIdFromSlug as jest.MockedFunction<
  typeof getIdFromSlug
>
const mockGetParams = getParams as jest.MockedFunction<typeof getParams>

describe('ListDetails useContainer hook', () => {
  let navigate: jest.Mock
  let setSearchParams: jest.Mock
  let mockGet: jest.Mock
  let updatePage: jest.Mock
  let handleError: jest.Mock
  let deleteListTrigger: jest.Mock
  let deleteListUnwrapOk: jest.Mock
  let deleteListUnwrapErr: jest.Mock
  let removeTrigger: jest.Mock
  let removeUnwrapOk: jest.Mock
  let removeUnwrapErr: jest.Mock

  const modalSpy = jest.spyOn(Modal, 'confirm')

  beforeEach(() => {
    // router
    navigate = jest.fn()
    mockUseNavigate.mockReturnValue(navigate as never)
    mockUseParams.mockReturnValue({ listSlug: '1234-the-list' } as never)
    mockGet = jest.fn().mockReturnValue('1')
    setSearchParams = jest.fn()
    mockUseSearchParams.mockReturnValue([
      { get: mockGet } as never,
      setSearchParams as never,
    ] as never)

    // helpers
    mockGetIdFromSlug.mockReturnValue(1234 as never)
    mockGetParams.mockImplementation(
      ({ page, search }: { page?: number | string; search?: string }) => {
        const params: { page?: string; search?: string } = {}
        if (search) params.search = search
        if (page && Number(page) > 1) params.page = String(page)
        return params
      }
    )
    mockErrorMessage.mockImplementation(err => (err ? 'Mocked Error' : null))

    // queries
    mockUseGetListDetailsQuery.mockReturnValue({
      data: { id: 1234, items: [{ id: 10 }] },
      error: null,
      isLoading: false,
    } as never)

    // mutations
    deleteListUnwrapOk = jest.fn().mockResolvedValue(undefined)
    deleteListUnwrapErr = jest.fn().mockRejectedValue('err')
    deleteListTrigger = jest
      .fn()
      .mockReturnValue({ unwrap: deleteListUnwrapOk })
    mockUseDeleteListMutation.mockReturnValue([deleteListTrigger] as never)

    removeUnwrapOk = jest.fn().mockResolvedValue(undefined)
    removeUnwrapErr = jest.fn().mockRejectedValue('err')
    removeTrigger = jest.fn().mockReturnValue({ unwrap: removeUnwrapOk })
    mockUseRemoveMovieFromListMutation.mockReturnValue([removeTrigger] as never)

    // other hooks
    updatePage = jest.fn()
    mockUseUpdatePage.mockReturnValue({ updatePage } as never)
    handleError = jest.fn()
    mockUseHandleError.mockReturnValue({ handleError } as never)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return correct values and call query with parsed list id and page', () => {
    const { result } = renderHook(() => useContainer())

    expect(result.current.list).toEqual({ id: 1234, items: [{ id: 10 }] })
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()

    expect(mockGetIdFromSlug).toHaveBeenCalledWith('1234-the-list')
    expect(mockUseGetListDetailsQuery).toHaveBeenCalledWith({
      listId: 1234,
      page: '1',
    })
  })

  it('should reflect loading state', () => {
    mockUseGetListDetailsQuery.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    } as never)

    const { result } = renderHook(() => useContainer())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.list).toBeUndefined()
  })

  it('should map error using errorMessage helper', () => {
    const apiError = { status: 500 } as never
    mockUseGetListDetailsQuery.mockReturnValue({
      data: undefined,
      error: apiError,
      isLoading: false,
    } as never)
    ;(mockErrorMessage as jest.Mock).mockReturnValue('Some error')

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

  it('should confirm and delete list successfully', async () => {
    const { result } = renderHook(() => useContainer())

    act(() => {
      result.current.handleConfirmDeleteList()
    })

    expect(modalSpy).toHaveBeenCalled()
    const args = (modalSpy as jest.Mock).mock.calls[0][0]
    expect(args.title).toBe('Do you want to delete list?')
    expect(typeof args.onOk).toBe('function')

    await act(async () => {
      await args.onOk()
    })

    expect(deleteListTrigger).toHaveBeenCalledWith(1234)
    expect(deleteListUnwrapOk).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/lists')
  })

  it('should handle error when list delete fails', async () => {
    mockUseDeleteListMutation.mockReturnValue([
      jest.fn().mockReturnValue({ unwrap: deleteListUnwrapErr }),
    ] as never)

    const { result } = renderHook(() => useContainer())

    await act(async () => {
      await result.current.handleDeleteList()
    })

    expect(handleError).toHaveBeenCalled()
  })

  it('should confirm and delete movie successfully', async () => {
    const { result } = renderHook(() => useContainer())
    const event = {
      stopPropagation: jest.fn(),
    } as unknown as MouseEvent<HTMLSpanElement>

    act(() => {
      result.current.handleConfirmDeleteMovie(event, 4321)
    })

    expect(event.stopPropagation).toHaveBeenCalled()
    expect(modalSpy).toHaveBeenCalled()
    const args = (modalSpy as jest.Mock).mock.calls[0][0]
    expect(args.title).toBe('Do you want to delete movie from this list?')
    expect(typeof args.onOk).toBe('function')

    await act(async () => {
      await args.onOk()
    })

    expect(removeTrigger).toHaveBeenCalledWith({ listId: 1234, movieId: 4321 })
    expect(removeUnwrapOk).toHaveBeenCalled()
    expect(updatePage).toHaveBeenCalled()
  })

  it('should handle error when movie delete fails', async () => {
    mockUseRemoveMovieFromListMutation.mockReturnValue([
      jest.fn().mockReturnValue({ unwrap: removeUnwrapErr }),
    ] as never)

    const { result } = renderHook(() => useContainer())

    await act(async () => {
      await result.current.handleDeleteMovie(9999)
    })

    expect(handleError).toHaveBeenCalled()
  })
})
