import { nanoid } from '@reduxjs/toolkit'
import { act, renderHook } from '@testing-library/react'
import { modalTypes } from 'src/components/ModalsRoot/modalComponents'
import { useModalsContext } from 'src/contexts/ModalsProvider'

import useModal from '../useModal'

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'generated-id'),
}))

jest.mock('src/contexts/ModalsProvider', () => ({
  useModalsContext: jest.fn(),
}))

const mockUseModalsContext = useModalsContext as jest.MockedFunction<
  typeof useModalsContext
>
const mockNanoid = nanoid as jest.Mock

describe('useModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockNanoid.mockReturnValue('generated-id')
  })

  it('dispatches OPEN_MODAL with generated id when openModal is called', () => {
    const dispatch = jest.fn()
    mockUseModalsContext.mockReturnValue({ dispatch, modals: [] } as never)

    const { result } = renderHook(() => useModal())

    act(() => {
      result.current.openModal({
        modalProps: { title: 'Test modal' } as never,
        modalType: modalTypes.CREATE_LIST,
      } as never)
    })

    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        modalId: 'generated-id',
        modalProps: { title: 'Test modal' },
        modalType: modalTypes.CREATE_LIST,
      },
      type: 'OPEN_MODAL',
    })
  })

  it('dispatches CLOSE_MODAL with generated id when closeModal is called', () => {
    const dispatch = jest.fn()
    mockUseModalsContext.mockReturnValue({ dispatch, modals: [] } as never)

    const { result } = renderHook(() => useModal())

    act(() => {
      result.current.closeModal()
    })

    expect(dispatch).toHaveBeenCalledWith({
      payload: 'generated-id',
      type: 'CLOSE_MODAL',
    })
  })

  it('uses provided modal id when initModalId is supplied', () => {
    const dispatch = jest.fn()
    mockUseModalsContext.mockReturnValue({ dispatch, modals: [] } as never)

    const { result } = renderHook(() => useModal('custom-id'))

    expect(mockNanoid).not.toHaveBeenCalled()

    act(() => {
      result.current.openModal({
        modalProps: {},
        modalType: modalTypes.CREATE_LIST,
      } as never)
    })

    act(() => {
      result.current.closeModal()
    })

    expect(dispatch).toHaveBeenNthCalledWith(1, {
      payload: {
        modalId: 'custom-id',
        modalProps: {},
        modalType: modalTypes.CREATE_LIST,
      },
      type: 'OPEN_MODAL',
    })
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      payload: 'custom-id',
      type: 'CLOSE_MODAL',
    })
  })

  it('returns memoized callbacks for openModal and closeModal', () => {
    const dispatch = jest.fn()
    mockUseModalsContext.mockReturnValue({ dispatch, modals: [] } as never)

    const { rerender, result } = renderHook(() => useModal())

    const initialOpen = result.current.openModal
    const initialClose = result.current.closeModal

    rerender()

    expect(result.current.openModal).toBe(initialOpen)
    expect(result.current.closeModal).toBe(initialClose)
  })
})
