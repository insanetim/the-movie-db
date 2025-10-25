import { act, renderHook } from '@testing-library/react'
import { useModalsContext } from 'src/contexts/ModalsProvider'

import useContainer from '../hook'

jest.mock('src/contexts/ModalsProvider')

const mockedUseModalsContext = useModalsContext as jest.MockedFunction<
  typeof useModalsContext
>

describe('ModalRoot useContainer hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const createContextMock = () => {
    const dispatch = jest.fn()
    const modals: ReturnType<typeof useContainer>['modals'] = []

    mockedUseModalsContext.mockReturnValue({ dispatch, modals })

    return { dispatch, modals }
  }

  it('returns context-provided modals and callbacks', () => {
    const { dispatch, modals } = createContextMock()

    const { result } = renderHook(() => useContainer())

    expect(mockedUseModalsContext).toHaveBeenCalled()
    expect(result.current.modals).toBe(modals)
    expect(typeof result.current.closeModal).toBe('function')
    expect(typeof result.current.removeModal).toBe('function')

    act(() => {
      result.current.closeModal('modal-1')
    })
    expect(dispatch).toHaveBeenCalledWith({
      payload: 'modal-1',
      type: 'CLOSE_MODAL',
    })

    act(() => {
      result.current.removeModal('modal-2')
    })
    expect(dispatch).toHaveBeenCalledWith({
      payload: 'modal-2',
      type: 'REMOVE_MODAL',
    })
  })

  it('memoizes callbacks between renders', () => {
    createContextMock()

    const { rerender, result } = renderHook(() => useContainer())

    const closeModalRef = result.current.closeModal
    const removeModalRef = result.current.removeModal

    rerender()

    expect(result.current.closeModal).toBe(closeModalRef)
    expect(result.current.removeModal).toBe(removeModalRef)
  })

  it('handles multiple modals from context', () => {
    const modalA = {
      modalId: 'a',
      modalProps: {},
      modalType: 'CREATE_LIST' as const,
    }
    const modalB = {
      modalId: 'b',
      modalProps: {},
      modalType: 'CREATE_LIST' as const,
    }

    const { dispatch } = createContextMock()
    mockedUseModalsContext.mockReturnValue({
      dispatch,
      modals: [modalA, modalB],
    })

    const { result } = renderHook(() => useContainer())

    expect(result.current.modals).toHaveLength(2)
    expect(result.current.modals[0]).toEqual(modalA)
    expect(result.current.modals[1]).toEqual(modalB)
  })
})
