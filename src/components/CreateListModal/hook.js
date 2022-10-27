import { useDispatch } from 'react-redux'
import { hideModal } from 'src/state/app/actions'
import { createList } from 'src/state/lists/actions'

export const useContainer = (form, cb) => {
  const dispatch = useDispatch()

  const handleOk = () => {
    form.submit()
  }

  const handleSubmit = value => {
    dispatch(hideModal())
    dispatch(createList(value, cb))
  }

  const handleAfterClose = () => {
    form.resetFields()
  }

  return { handleOk, handleSubmit, handleAfterClose }
}
