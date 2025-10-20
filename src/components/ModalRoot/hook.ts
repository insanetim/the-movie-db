import { hideModal, selectModal } from 'src/store/features/app'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'

import { ModalProps, ModalRootHookReturn } from './types'

const useContainer = (): ModalRootHookReturn => {
  const dispatch = useAppDispatch()
  const { modalProps, modalType } = useAppSelector(selectModal)

  const onCancel = () => {
    dispatch(hideModal())
  }

  return { modalProps: modalProps as ModalProps, modalType, onCancel }
}

export default useContainer
