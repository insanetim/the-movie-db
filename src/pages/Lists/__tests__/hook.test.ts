import { act, renderHook } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'
import { modalComponentsMap } from 'src/components/ModalsRoot/modalComponents'
import useHandleError from 'src/hooks/useHandleError'
import { showModal } from 'src/store/features/app'
import { selectAccount } from 'src/store/features/auth'
import {
  ListData,
  useCreateListMutation,
  useGetListsQuery,
} from 'src/store/features/list'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import errorMessage from 'src/utils/helpers/errorMessage'
import getParams from 'src/utils/helpers/getParams'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}))
jest.mock('src/store/features/list')
jest.mock('src/store/hooks')
jest.mock('src/hooks/useHandleError')
jest.mock('src/utils/helpers/errorMessage')
jest.mock('src/utils/helpers/getParams')
jest.mock('src/store/features/app', () => ({
  showModal: jest.fn((payload: never) => ({ payload, type: 'SHOW_MODAL' })),
}))
jest.mock('src/components/ModalRoot/modalComponents', () => ({
  modalComponentsMap: { MODAL_CREATE_LIST: 'MODAL_CREATE_LIST' },
}))
jest.mock('src/store/features/auth', () => ({
  selectAccount: jest.fn(),
}))

const mockUseSearchParams = useSearchParams as jest.MockedFunction<
  typeof useSearchParams
>
const mockUseGetListsQuery = useGetListsQuery as jest.MockedFunction<
  typeof useGetListsQuery
>
const mockUseCreateListMutation = useCreateListMutation as jest.MockedFunction<
  typeof useCreateListMutation
>
const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<
  typeof useAppDispatch
>
const mockUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>
const mockUseHandleError = useHandleError as jest.MockedFunction<
  typeof useHandleError
>
const mockErrorMessage = errorMessage as jest.MockedFunction<
  typeof errorMessage
>
const mockGetParams = getParams as jest.MockedFunction<typeof getParams>
const mockShowModal = showModal as unknown as jest.Mock
const mockSelectAccount = selectAccount as unknown as jest.Mock

describe('Lists useContainer hook', () => {
  let setSearchParams: jest.Mock
  let mockGet: jest.Mock
  let dispatch: jest.Mock
  let handleError: jest.Mock
  let createTrigger: jest.Mock
  let unwrapOk: jest.Mock
  let unwrapErr: jest.Mock

  beforeEach(() => {
    mockGet = jest.fn().mockReturnValue('1')
    setSearchParams = jest.fn()
    mockUseSearchParams.mockReturnValue([
      { get: mockGet } as never,
      setSearchParams as never,
    ] as never)

    dispatch = jest.fn()
    mockUseAppDispatch.mockReturnValue(dispatch as never)

    mockSelectAccount.mockReturnValue({ id: '1' })
    mockUseAppSelector.mockImplementation(() => mockSelectAccount() as never)

    mockErrorMessage.mockImplementation(err => (err ? 'Mocked Error' : null))
    mockGetParams.mockImplementation(
      ({ page, search }: { page?: number | string; search?: string }) => {
        const params: { page?: string; search?: string } = {}
        if (search) params.search = search
        if (page && Number(page) > 1) params.page = String(page)
        return params
      }
    )

    mockUseGetListsQuery.mockReturnValue({
      data: { results: [{ id: 'l1' }] },
      error: null,
      isLoading: false,
    } as never)

    unwrapOk = jest.fn().mockResolvedValue(undefined)
    unwrapErr = jest.fn().mockRejectedValue('err')
    createTrigger = jest.fn().mockReturnValue({ unwrap: unwrapOk })
    mockUseCreateListMutation.mockReturnValue([createTrigger] as never)

    handleError = jest.fn()
    mockUseHandleError.mockReturnValue({ handleError } as never)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return values and call query with page and proper skip option', () => {
    const { result } = renderHook(() => useContainer())

    expect(result.current.isLoading).toBe(false)
    expect(result.current.lists).toEqual({ results: [{ id: 'l1' }] })
    expect(result.current.error).toBeNull()

    expect(mockUseGetListsQuery).toHaveBeenCalledWith('1', { skip: false })
  })

  it('should default page to "1" when search param is missing', () => {
    mockGet.mockReturnValue(null)

    renderHook(() => useContainer())

    expect(mockUseGetListsQuery).toHaveBeenCalledWith('1', { skip: false })
  })

  it('should skip query when account is missing', () => {
    mockSelectAccount.mockReturnValue(undefined)
    const { result } = renderHook(() => useContainer())

    expect(result.current.isLoading).toBe(false)
    expect(mockUseGetListsQuery).toHaveBeenCalledWith('1', { skip: true })
  })

  it('should reflect loading state', () => {
    mockUseGetListsQuery.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    } as never)

    const { result } = renderHook(() => useContainer())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.lists).toBeUndefined()
  })

  it('should map error using errorMessage helper', () => {
    const apiError = { status: 500 } as never
    mockUseGetListsQuery.mockReturnValue({
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

  it('should open create list modal with correct payload', () => {
    const { result } = renderHook(() => useContainer())

    act(() => {
      result.current.handleOpenCreateListModal()
    })

    expect(mockShowModal).toHaveBeenCalled()
    const call = mockShowModal.mock.calls[0][0]
    expect(call.modalType).toBe(modalComponentsMap.MODAL_CREATE_LIST)
    expect(typeof call.modalProps.onSubmit).toBe('function')
    expect(dispatch).toHaveBeenCalledWith({ payload: call, type: 'SHOW_MODAL' })
  })

  it('should create list successfully on submit', async () => {
    const { result } = renderHook(() => useContainer())
    const listData = { description: 'desc', name: 'New' } as ListData

    await act(async () => {
      await result.current.handleCreateList(listData)
    })

    expect(createTrigger).toHaveBeenCalledWith(listData)
    expect(unwrapOk).toHaveBeenCalled()
  })

  it('should handle error when create list fails', async () => {
    mockUseCreateListMutation.mockReturnValue([
      jest.fn().mockReturnValue({ unwrap: unwrapErr }),
    ] as never)

    const { result } = renderHook(() => useContainer())
    const listData = { description: 'x', name: 'Oops' } as ListData

    await act(async () => {
      await result.current.handleCreateList(listData)
    })

    expect(handleError).toHaveBeenCalled()
  })
})
