import { nanoid } from '@reduxjs/toolkit'
import { useCallback } from 'react'
import { useModalsContext } from 'src/contexts/ModalsProvider'
import { Modal } from 'src/contexts/ModalsProvider/types'

const useModal = (initId?: string) => {
  const { dispatch } = useModalsContext()

  const id = initId ?? nanoid()

  const openModal = useCallback(
    (modal: Modal) => {
      dispatch({
        payload: {
          ...modal,
          id,
        },
        type: 'OPEN_MODAL',
      })
    },
    [dispatch, id]
  )

  const closeModal = useCallback(() => {
    dispatch({ payload: id, type: 'CLOSE_MODAL' })
  }, [dispatch, id])

  return { closeModal, openModal }
}

export default useModal
