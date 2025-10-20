import { act, renderHook } from '@testing-library/react'
import { hideModal, selectModal } from 'src/store/features/app'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'

import useContainer from '../hook'
import { ModalTypes } from '../types'

jest.mock('src/store/features/app')
jest.mock('src/store/hooks')

const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<
  typeof useAppDispatch
>
const mockUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>
const mockSelectModal = selectModal as jest.MockedFunction<typeof selectModal>
const mockHideModal = hideModal as jest.MockedFunction<typeof hideModal>

describe('ModalRoot useContainer hook', () => {
  const mockDispatch = jest.fn()

  beforeEach(() => {
    mockUseAppDispatch.mockReturnValue(mockDispatch)
    mockUseAppSelector.mockReturnValue({
      modalProps: null,
      modalType: null,
    })
    mockSelectModal.mockReturnValue({
      modalProps: null,
      modalType: null,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Redux integration', () => {
    it('should call useAppDispatch and return dispatch function', () => {
      renderHook(() => useContainer())

      expect(mockUseAppDispatch).toHaveBeenCalled()
    })

    it('should call useAppSelector with selectModal', () => {
      renderHook(() => useContainer())

      expect(mockUseAppSelector).toHaveBeenCalledWith(mockSelectModal)
    })
  })

  describe('Modal state handling', () => {
    it('should return null modal state when no modal is active', () => {
      const { result } = renderHook(() => useContainer())

      expect(result.current.modalProps).toBeNull()
      expect(result.current.modalType).toBeNull()
    })

    it('should return modal props and type when modal is active', () => {
      const mockModalProps = { listId: 123, name: 'Test List' }
      const mockModalType = 'MODAL_CREATE_LIST' as ModalTypes

      mockUseAppSelector.mockReturnValue({
        modalProps: mockModalProps,
        modalType: mockModalType,
      })

      const { result } = renderHook(() => useContainer())

      expect(result.current.modalProps).toEqual(mockModalProps)
      expect(result.current.modalType).toBe(mockModalType)
    })

    it('should handle different modal types', () => {
      const modalTypes: ModalTypes[] = ['MODAL_CREATE_LIST']

      modalTypes.forEach(modalType => {
        mockUseAppSelector.mockReturnValue({
          modalProps: { someProp: 'value' },
          modalType,
        })

        const { result } = renderHook(() => useContainer())

        expect(result.current.modalType).toBe(modalType)
        expect(result.current.modalProps).toEqual({ someProp: 'value' })
      })
    })
  })

  describe('onCancel functionality', () => {
    it('should dispatch hideModal when onCancel is called', () => {
      const { result } = renderHook(() => useContainer())

      act(() => {
        result.current.onCancel()
      })

      expect(mockDispatch).toHaveBeenCalledWith(mockHideModal())
    })

    it('should call dispatch function correctly', () => {
      const { result } = renderHook(() => useContainer())

      act(() => {
        result.current.onCancel()
      })

      expect(mockDispatch).toHaveBeenCalledTimes(1)
      expect(mockDispatch).toHaveBeenCalledWith(mockHideModal())
    })
  })

  describe('Hook return values', () => {
    it('should return all required properties', () => {
      const { result } = renderHook(() => useContainer())

      expect(result.current).toHaveProperty('modalProps')
      expect(result.current).toHaveProperty('modalType')
      expect(result.current).toHaveProperty('onCancel')
      expect(typeof result.current.onCancel).toBe('function')
    })

    it('should return onCancel as a function', () => {
      const { result } = renderHook(() => useContainer())

      expect(typeof result.current.onCancel).toBe('function')
    })
  })

  describe('State changes', () => {
    it('should reflect modal state changes', () => {
      const { rerender, result } = renderHook(() => useContainer())

      // Initial state
      expect(result.current.modalProps).toBeNull()
      expect(result.current.modalType).toBeNull()

      // Change state
      mockUseAppSelector.mockReturnValue({
        modalProps: { listId: 456 },
        modalType: 'MODAL_CREATE_LIST' as ModalTypes,
      })

      rerender()

      expect(result.current.modalProps).toEqual({ listId: 456 })
      expect(result.current.modalType).toBe('MODAL_CREATE_LIST')
    })

    it('should handle modal state reset', () => {
      // Start with active modal
      mockUseAppSelector.mockReturnValue({
        modalProps: { listId: 123 },
        modalType: 'MODAL_CREATE_LIST' as ModalTypes,
      })

      const { rerender, result } = renderHook(() => useContainer())

      expect(result.current.modalProps).toEqual({ listId: 123 })
      expect(result.current.modalType).toBe('MODAL_CREATE_LIST')

      // Reset to null state
      mockUseAppSelector.mockReturnValue({
        modalProps: null,
        modalType: null,
      })

      rerender()

      expect(result.current.modalProps).toBeNull()
      expect(result.current.modalType).toBeNull()
    })
  })

  describe('Type safety', () => {
    it('should handle typed modal props correctly', () => {
      interface CreateListModalProps {
        listId?: number
        name?: string
      }

      const typedModalProps: CreateListModalProps = {
        listId: 789,
        name: 'Typed List',
      }

      mockUseAppSelector.mockReturnValue({
        modalProps: typedModalProps,
        modalType: 'MODAL_CREATE_LIST' as ModalTypes,
      })

      const { result } = renderHook(() => useContainer())

      expect(result.current.modalProps).toEqual(typedModalProps)
      expect(result.current.modalType).toBe('MODAL_CREATE_LIST')
    })
  })
})
