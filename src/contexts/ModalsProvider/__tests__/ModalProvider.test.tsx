import { render, screen } from '@testing-library/react'

import { ModalsProvider, modalsReducer } from '../ModalsProvider'
import { Modal } from '../types'

const TestChild = () => <div>Test Child</div>

const mockModal: Modal = {
  modalId: 'test-modal',
  modalProps: {},
  modalType: 'CREATE_LIST',
}

describe('ModalsProvider', () => {
  it('should render children', () => {
    render(
      <ModalsProvider>
        <TestChild />
      </ModalsProvider>
    )

    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  describe('modalsReducer', () => {
    it('should handle OPEN_MODAL action', () => {
      const action = { payload: mockModal, type: 'OPEN_MODAL' as const }
      const state = modalsReducer([], action)

      expect(state).toEqual([mockModal])
    })

    it('should handle CLOSE_MODAL action', () => {
      const initialState = [mockModal]
      const action = { payload: 'test-modal', type: 'CLOSE_MODAL' as const }
      const state = modalsReducer(initialState, action)

      expect(state[0].modalProps?.open).toBe(false)
    })

    it('should handle REMOVE_MODAL action', () => {
      const initialState = [mockModal]
      const action = { payload: 'test-modal', type: 'REMOVE_MODAL' as const }
      const state = modalsReducer(initialState, action)

      expect(state).toEqual([])
    })

    it('should return current state for unknown action', () => {
      const initialState = [mockModal]
      const action = { payload: 'test', type: 'UNKNOWN_ACTION' as never }
      const state = modalsReducer(initialState, action)

      expect(state).toEqual(initialState)
    })
  })
})
