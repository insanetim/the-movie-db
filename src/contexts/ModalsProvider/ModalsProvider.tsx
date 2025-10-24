import { PropsWithChildren, useMemo, useReducer } from 'react'
import ModalsRoot from 'src/components/ModalsRoot'

import { ModalsContext } from './ModalsContext'
import { Modal, ModalsReducerAction } from './types'

const modalsReducer = (state: Modal[], action: ModalsReducerAction) => {
  switch (action.type) {
    case 'CLOSE_MODAL': {
      const index = state.findIndex(modal => modal.id === action.payload)
      const updatedModal = {
        ...state[index],
        modalProps: { ...state[index].modalProps, open: false },
      }

      return state
        .slice(0, index)
        .concat(updatedModal)
        .concat(state.slice(index + 1))
    }
    case 'OPEN_MODAL':
      return [...state, action.payload]
    default:
      return state
  }
}

const initialState: Modal[] = []

export const ModalsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(modalsReducer, initialState)

  const value = useMemo(() => ({ dispatch, modals: state }), [state])

  return (
    <ModalsContext.Provider value={value}>
      {children}
      <ModalsRoot />
    </ModalsContext.Provider>
  )
}
