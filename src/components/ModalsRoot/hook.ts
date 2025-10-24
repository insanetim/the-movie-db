import { useCallback } from 'react'
import { useModalsContext } from 'src/contexts/ModalsProvider'

import { ModalRootHookReturn } from './types'

const useContainer = (): ModalRootHookReturn => {
  const { dispatch, modals } = useModalsContext()

  const closeModal = useCallback(
    (modalId: string) => {
      dispatch({ payload: modalId, type: 'CLOSE_MODAL' })
    },
    [dispatch]
  )

  const removeDialog = useCallback(
    (modalId: string) => {
      dispatch({ payload: modalId, type: 'REMOVE_MODAL' })
    },
    [dispatch]
  )

  return { closeModal, modals, removeDialog }
}

export default useContainer
