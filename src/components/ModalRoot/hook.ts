import { hideModal } from 'src/store/app/actions'
import { modalSelector } from 'src/store/app/selectors'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'

import { ModalRootHookReturn } from './types'

const useContainer = (): ModalRootHookReturn => {
  const dispatch = useAppDispatch()
  const { modalProps, modalType } = useAppSelector(modalSelector)

  const onCancel = () => {
    dispatch(hideModal())
  }

  return { modalProps, modalType, onCancel }
}

export default useContainer
