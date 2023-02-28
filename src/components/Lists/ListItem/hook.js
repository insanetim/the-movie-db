import { Modal } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { deleteList } from 'src/state/lists/actions'

const useContainer = ({ listId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = () => navigate(`/list/${listId}`)

  const handleDelete = event => {
    event.stopPropagation()
    const onOk = () => {
      dispatch(deleteList({ listId }))
    }
    Modal.confirm({
      title: 'Do you want to delete list?',
      onOk
    })

    return onOk
  }

  return { handleClick, handleDelete }
}

export default useContainer
