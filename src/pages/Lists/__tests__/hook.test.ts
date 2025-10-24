import { act, renderHook } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'
import { modalTypes } from 'src/components/ModalsRoot/modalComponents'
import useHandleError from 'src/hooks/useHandleError'
import useModal from 'src/hooks/useModal'
import {
  useCreateListMutation,
  useGetListsQuery,
} from 'src/store/features/list'
import { useAppSelector } from 'src/store/hooks'
import errorMessage from 'src/utils/helpers/errorMessage'
import getParams from 'src/utils/helpers/getParams'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}))
jest.mock('src/hooks/useHandleError')
jest.mock('src/hooks/useModal')
jest.mock('src/store/features/list')
jest.mock('src/store/hooks')
jest.mock('src/utils/helpers/errorMessage')
jest.mock('src/utils/helpers/getParams')

const mockUseSearchParams = useSearchParams as jest.MockedFunction<
  typeof useSearchParams
>
const mockUseHandleError = useHandleError as jest.MockedFunction<
  typeof useHandleError
>
const mockUseModal = useModal as jest.MockedFunction<typeof useModal>
const mockUseCreateListMutation = useCreateListMutation as jest.MockedFunction<
  typeof useCreateListMutation
>
const mockUseGetListsQuery = useGetListsQuery as jest.MockedFunction<
  typeof useGetListsQuery
>
const mockUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>
const mockErrorMessage = errorMessage as jest.MockedFunction<
  typeof errorMessage
>
const mockGetParams = getParams as jest.MockedFunction<typeof getParams>

describe('Lists useContainer hook', () => {
  let setSearchParams: jest.Mock
  let mockGet: jest.Mock
  let handleError: jest.Mock
  let openModal: jest.Mock
  let closeModal: jest.Mock
  let createListTrigger: jest.Mock
  let unwrapSuccess: jest.Mock
  let unwrapReject: jest.Mock

  beforeEach(() => {
    mockGet = jest.fn().mockReturnValue('1')
    setSearchParams = jest.fn()
    mockUseSearchParams.mockReturnValue([
      { get: mockGet } as never,
      setSearchParams as never,
    ] as never)

    mockUseAppSelector.mockReturnValue({ id: 'acc-1' } as never)

    mockErrorMessage.mockImplementation(err => (err ? 'Mocked Error' : null))
    mockGetParams.mockImplementation(({ page }) =>
      page && Number(page) > 1 ? { page: String(page) } : {}
    )

    mockUseGetListsQuery.mockReturnValue({
      data: { results: [{ id: 1 }] },
      error: null,
      isLoading: false,
    } as never)

    handleError = jest.fn()
    mockUseHandleError.mockReturnValue({ handleError } as never)

    openModal = jest.fn()
    closeModal = jest.fn()
    mockUseModal.mockReturnValue({ closeModal, openModal } as never)

    unwrapSuccess = jest.fn().mockResolvedValue(undefined)
    unwrapReject = jest.fn().mockRejectedValue('create-error')
    createListTrigger = jest.fn().mockReturnValue({ unwrap: unwrapSuccess })
    mockUseCreateListMutation.mockReturnValue([createListTrigger] as never)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return values and call list query with current page', () => {
    const { result } = renderHook(() => useContainer())

    expect(result.current.isLoading).toBe(false)
    expect(result.current.lists).toEqual({ results: [{ id: 1 }] })
    expect(result.current.error).toBeNull()

    expect(mockUseGetListsQuery).toHaveBeenCalledWith('1', { skip: false })
  })

  it('should skip query when account is missing', () => {
    mockUseAppSelector.mockReturnValueOnce(undefined as never)

    renderHook(() => useContainer())

    expect(mockUseGetListsQuery).toHaveBeenCalledWith('1', { skip: true })
  })

  it('should update search params on pagination', () => {
    mockGetParams.mockReturnValueOnce({ page: '4' })

    const { result } = renderHook(() => useContainer())

    act(() => {
      result.current.handlePagination(4)
    })

    expect(mockGetParams).toHaveBeenCalledWith({ page: 4 })
    expect(setSearchParams).toHaveBeenCalledWith({ page: '4' })
  })

  it('should create list successfully', async () => {
    const { result } = renderHook(() => useContainer())
    const payload = { name: 'New List' } as never

    await act(async () => {
      await result.current.handleCreateList(payload)
    })

    expect(createListTrigger).toHaveBeenCalledWith(payload)
    expect(unwrapSuccess).toHaveBeenCalled()
  })

  it('should call handleError when create list fails', async () => {
    createListTrigger.mockReturnValueOnce({ unwrap: unwrapReject })

    const { result } = renderHook(() => useContainer())

    await act(async () => {
      await result.current.handleCreateList({} as never)
    })

    expect(unwrapReject).toHaveBeenCalled()
    expect(handleError).toHaveBeenCalledWith('create-error')
  })

  it('should open create list modal with proper props', () => {
    const { result } = renderHook(() => useContainer())

    act(() => {
      result.current.handleOpenCreateListModal()
    })

    expect(openModal).toHaveBeenCalledTimes(1)
    const args = openModal.mock.calls[0][0]

    expect(args.modalType).toBe(modalTypes.CREATE_LIST)
    expect(args.modalProps.closeModal).toBe(closeModal)
    expect(args.modalProps.onSubmit).toBe(result.current.handleCreateList)
  })
})

