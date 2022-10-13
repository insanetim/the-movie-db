import { useDispatch } from 'react-redux'
import { createList, hideModal } from 'src/store/actions'

export const useContainer = form => {
  const dispatch = useDispatch()

  const handleOk = () => {
    form.submit()
  }

  const handleSubmit = value => {
    dispatch(hideModal())
    dispatch(createList(value))
  }

  const handleAfterClose = () => {
    form.resetFields()
  }

  return { handleOk, handleSubmit, handleAfterClose }
}
