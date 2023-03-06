import { useDispatch } from 'react-redux'

import { hideModal } from 'src/state/app/actions'
import { createList } from 'src/state/lists/actions'

const useContainer = ({ form, movieId }) => {
  const dispatch = useDispatch()

  const handleOk = () => {
    form.submit()
  }

  const handleSubmit = listData => {
    dispatch(hideModal())
    dispatch(createList({ listData, movieId }))
  }

  const handleAfterClose = () => {
    form.resetFields()
  }

  return { handleOk, handleSubmit, handleAfterClose }
}

export default useContainer
