import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { hideModal } from 'src/store/app/actions'
import { modalSelector } from 'src/store/app/selectors'

import { ModalRootHook } from './types'

const useContainer = (): ModalRootHook => {
  const dispatch = useAppDispatch()
  const { modalProps, modalType } = useAppSelector(modalSelector)

  const onCancel = () => {
    dispatch(hideModal())
  }

  return { modalProps, modalType, onCancel }
}

export default useContainer
