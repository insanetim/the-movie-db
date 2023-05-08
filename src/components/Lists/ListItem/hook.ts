import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd'

import { useAppDispatch } from 'src/hooks/useRedux'
import { deleteList } from 'src/store/lists/actions'
import type { ListItemHook, ListItemHookProps } from './types'

const useContainer = ({ listId }: ListItemHookProps): ListItemHook => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/list/${listId}`)
  }

  const handleListDelete = (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()

    const onOk = () => {
      dispatch(deleteList(listId))
    }

    Modal.confirm({
      title: 'Do you want to delete list?',
      onOk
    })

    return onOk
  }

  return { handleClick, handleListDelete }
}

export default useContainer
