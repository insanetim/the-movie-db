import { Modal } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteList } from 'src/store/actions'

export const useContainer = id => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = () => navigate(`/list/${id}`)

  const handleDelete = event => {
    event.stopPropagation()
    Modal.confirm({
      title: 'Do you want to delete list?',
      onOk() {
        dispatch(deleteList(id))
      }
    })
  }

  return { handleClick, handleDelete }
}
