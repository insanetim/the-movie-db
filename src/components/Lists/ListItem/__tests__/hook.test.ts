import { act, renderHook } from '@testing-library/react'
import { Modal } from 'antd'
import { MouseEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useHandleError from 'src/hooks/useHandleError'
import useUpdatePage from 'src/hooks/useUpdatePage'
import {
  useDeleteListMutation,
  useGetListsQuery,
} from 'src/store/features/list'
import getSlug from 'src/utils/helpers/getSlug'

import useContainer from '../hook'
import { ListItemHookProps } from '../types'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}))

jest.mock('src/hooks/useHandleError')
jest.mock('src/hooks/useUpdatePage')
jest.mock('src/store/features/list')
jest.mock('src/utils/helpers/getSlug')

const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>
const mockUseSearchParams = useSearchParams as jest.MockedFunction<
  typeof useSearchParams
>
const mockUseHandleError = useHandleError as jest.MockedFunction<
  typeof useHandleError
>
const mockUseUpdatePage = useUpdatePage as jest.MockedFunction<
  typeof useUpdatePage
>
const mockUseGetListsQuery = useGetListsQuery as jest.MockedFunction<
  typeof useGetListsQuery
>
const mockUseDeleteListMutation = useDeleteListMutation as jest.MockedFunction<
  typeof useDeleteListMutation
>
const mockGetSlug = getSlug as jest.MockedFunction<typeof getSlug>

describe('ListItem useContainer hook', () => {
  const mockNavigate = jest.fn()
  const mockSetSearchParams = jest.fn()
  const mockSearchParamsGet = jest.fn()
  const mockHandleError = jest.fn()
  const mockUpdatePage = jest.fn()
  const mockDeleteList = jest.fn()
  const mockUnwrap = jest.fn()

  const defaultProps: ListItemHookProps = {
    listId: 123,
    name: 'Test List',
  }

  const modalSpy = jest.spyOn(Modal, 'confirm')

  beforeEach(() => {
    mockSearchParamsGet.mockReturnValue('1')
    mockUseSearchParams.mockReturnValue([
      { get: mockSearchParamsGet } as never,
      mockSetSearchParams,
    ])

    mockUseNavigate.mockReturnValue(mockNavigate)

    mockUseHandleError.mockReturnValue({
      handleError: mockHandleError,
    } as never)

    const mockListsData = {
      results: [
        { id: 123, name: 'Test List' },
        { id: 456, name: 'Another List' },
      ],
    }
    mockUseGetListsQuery.mockReturnValue({
      data: mockListsData,
    } as never)

    mockUseUpdatePage.mockReturnValue({
      updatePage: mockUpdatePage,
    } as never)

    mockUnwrap.mockResolvedValue(undefined)
    mockDeleteList.mockReturnValue({ unwrap: mockUnwrap })
    mockUseDeleteListMutation.mockReturnValue([mockDeleteList] as never)

    mockGetSlug.mockImplementation(
      (id, name) => `${id}-${name.toLowerCase().replace(/\s+/g, '-')}`
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Navigation functionality', () => {
    it('should navigate to list page with correct slug', () => {
      const { result } = renderHook(() => useContainer(defaultProps))

      act(() => {
        result.current.handleNavigateToList()
      })

      expect(mockGetSlug).toHaveBeenCalledWith(123, 'Test List')
      expect(mockNavigate).toHaveBeenCalledWith('/list/123-test-list')
    })

    it('should handle navigation with different list data', () => {
      const { result } = renderHook(() =>
        useContainer({ listId: 456, name: 'Another List' })
      )

      act(() => {
        result.current.handleNavigateToList()
      })

      expect(mockGetSlug).toHaveBeenCalledWith(456, 'Another List')
      expect(mockNavigate).toHaveBeenCalledWith('/list/456-another-list')
    })
  })

  describe('List deletion functionality', () => {
    it('should delete list successfully', async () => {
      const { result } = renderHook(() => useContainer(defaultProps))

      await act(async () => {
        await result.current.handleDeleteList()
      })

      expect(mockDeleteList).toHaveBeenCalledWith(123)
      expect(mockUnwrap).toHaveBeenCalled()
      expect(mockUpdatePage).toHaveBeenCalled()
      expect(mockHandleError).not.toHaveBeenCalled()
    })

    it('should handle deletion error', async () => {
      const mockError = new Error('Delete failed')
      mockUnwrap.mockRejectedValue(mockError)

      const { result } = renderHook(() => useContainer(defaultProps))

      await act(async () => {
        await result.current.handleDeleteList()
      })

      expect(mockDeleteList).toHaveBeenCalledWith(123)
      expect(mockUnwrap).toHaveBeenCalled()
      expect(mockUpdatePage).not.toHaveBeenCalled()
      expect(mockHandleError).toHaveBeenCalledWith(mockError)
    })
  })

  describe('Confirmation modal functionality', () => {
    it('should show confirmation modal and handle successful deletion', async () => {
      const { result } = renderHook(() => useContainer(defaultProps))

      const event = {
        stopPropagation: jest.fn(),
      } as unknown as MouseEvent<HTMLSpanElement>

      act(() => {
        result.current.handleConfirmDeleteList(event)
      })

      expect(event.stopPropagation).toHaveBeenCalled()
      expect(modalSpy).toHaveBeenCalled()

      const modalArgs = (modalSpy as jest.Mock).mock.calls[0][0]
      expect(modalArgs.title).toBe('Do you want to delete list?')
      expect(typeof modalArgs.onOk).toBe('function')

      await act(async () => {
        await modalArgs.onOk()
      })

      expect(mockDeleteList).toHaveBeenCalledWith(123)
      expect(mockUnwrap).toHaveBeenCalled()
      expect(mockUpdatePage).toHaveBeenCalled()
    })

    it('should handle modal cancellation', () => {
      const { result } = renderHook(() => useContainer(defaultProps))

      const event = {
        stopPropagation: jest.fn(),
      } as unknown as MouseEvent<HTMLSpanElement>

      act(() => {
        result.current.handleConfirmDeleteList(event)
      })

      expect(event.stopPropagation).toHaveBeenCalled()
      expect(modalSpy).toHaveBeenCalled()

      // Modal should be called but deletion should not occur until onOk is called
      expect(mockDeleteList).not.toHaveBeenCalled()
    })
  })

  describe('Hook return values', () => {
    it('should return all required handler functions', () => {
      const { result } = renderHook(() => useContainer(defaultProps))

      expect(typeof result.current.handleNavigateToList).toBe('function')
      expect(typeof result.current.handleDeleteList).toBe('function')
      expect(typeof result.current.handleConfirmDeleteList).toBe('function')
    })
  })

  describe('Integration with hooks', () => {
    it('should call useGetListsQuery with correct page parameter', () => {
      renderHook(() => useContainer(defaultProps))

      expect(mockUseGetListsQuery).toHaveBeenCalledWith('1')
    })

    it('should use search params for pagination', () => {
      mockSearchParamsGet.mockReturnValue('3')

      renderHook(() => useContainer(defaultProps))

      expect(mockUseGetListsQuery).toHaveBeenCalledWith('3')
    })

    it('should call useUpdatePage with correct parameters', () => {
      renderHook(() => useContainer(defaultProps))

      expect(mockUseUpdatePage).toHaveBeenCalledWith({
        items: [
          { id: 123, name: 'Test List' },
          { id: 456, name: 'Another List' },
        ],
        page: '1',
        setSearchParams: mockSetSearchParams,
      })
    })
  })
})
