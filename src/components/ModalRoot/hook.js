import { useDispatch, useSelector } from 'react-redux'
import { hideModal } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()
  const modalType = useSelector(state => state.modalType)
  const modalProps = useSelector(state => state.modalProps)

  const onCancel = () => {
    dispatch(hideModal())
  }

  return { modalType, modalProps, onCancel }
}
