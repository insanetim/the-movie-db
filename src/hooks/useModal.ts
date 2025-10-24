import { nanoid } from '@reduxjs/toolkit'
import { useCallback } from 'react'
import { useModalsContext } from 'src/contexts/ModalsProvider'
import { Modal } from 'src/contexts/ModalsProvider/types'

const useModal = (initModalId?: string) => {
  const { dispatch } = useModalsContext()

  const modalId = initModalId ?? nanoid()

  const openModal = useCallback(
    (modal: Omit<Modal, 'modalId'>) => {
      dispatch({ payload: { ...modal, modalId }, type: 'OPEN_MODAL' })
    },
    [dispatch, modalId]
  )

  const closeModal = useCallback(() => {
    dispatch({ payload: modalId, type: 'CLOSE_MODAL' })
  }, [dispatch, modalId])

  return { closeModal, openModal }
}

export default useModal
