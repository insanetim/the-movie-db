import { useDispatch } from 'react-redux'

import { hideModal } from 'src/state/app/actions'
import { createList } from 'src/state/lists/actions'

const useContainer = ({ form, callback }) => {
  const dispatch = useDispatch()

  const handleOk = () => {
    form.submit()
  }

  const handleSubmit = value => {
    dispatch(hideModal())
    dispatch(createList({ value, callback }))
  }

  const handleAfterClose = () => {
    form.resetFields()
  }

  return { handleOk, handleSubmit, handleAfterClose }
}

export default useContainer
