import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { hideModal } from 'src/store/app/actions'
import { modalPropsSelector, modalTypeSelector } from 'src/store/app/selectors'

import { ModalRootHook } from './types'

const useContainer = (): ModalRootHook => {
  const dispatch = useAppDispatch()
  const modalType = useAppSelector(modalTypeSelector)
  const modalProps = useAppSelector(modalPropsSelector)

  const onCancel = () => {
    dispatch(hideModal())
  }

  return { modalProps, modalType, onCancel }
}

export default useContainer
