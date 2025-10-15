import { hideModal, selectModal } from 'src/store/features/app'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'

import { ModalRootHookReturn } from './types'

const useContainer = (): ModalRootHookReturn => {
  const dispatch = useAppDispatch()
  const { modalProps, modalType } = useAppSelector(selectModal)

  const onCancel = () => {
    dispatch(hideModal())
  }

  return { modalProps, modalType, onCancel }
}

export default useContainer
