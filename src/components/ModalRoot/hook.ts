import { useSelector } from 'react-redux'
import { useAppDispatch } from 'src/hooks/useRedux'
import { hideModal } from 'src/store/app/actions'
import { modalSelector } from 'src/store/app/selectors'

import { ModalRootHookReturn } from './types'

const useContainer = (): ModalRootHookReturn => {
  const dispatch = useAppDispatch()
  const { modalProps, modalType } = useSelector(modalSelector)

  const onCancel = () => {
    dispatch(hideModal())
  }

  return { modalProps, modalType, onCancel }
}

export default useContainer
