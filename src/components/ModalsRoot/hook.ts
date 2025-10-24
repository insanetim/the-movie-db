import { useCallback } from 'react'
import { useModalsContext } from 'src/contexts/ModalsProvider'

import { ModalRootHookReturn } from './types'

const useContainer = (): ModalRootHookReturn => {
  const { dispatch, modals } = useModalsContext()

  const closeModal = useCallback(
    (id: string) => {
      dispatch({ payload: id, type: 'CLOSE_MODAL' })
    },
    [dispatch]
  )

  return { closeModal, modals }
}

export default useContainer
