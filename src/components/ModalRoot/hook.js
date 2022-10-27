import { useDispatch, useSelector } from 'react-redux'

import { hideModal } from 'src/state/app/actions'
import { modalPropsSelector, modalTypeSelector } from 'src/state/app/selectors'

export const useContainer = () => {
  const dispatch = useDispatch()
  const modalType = useSelector(modalTypeSelector)
  const modalProps = useSelector(modalPropsSelector)

  const onCancel = () => {
    dispatch(hideModal())
  }

  return { modalType, modalProps, onCancel }
}
