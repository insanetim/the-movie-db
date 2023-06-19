import { Modal } from 'antd'
import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
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
      onOk,
      title: 'Do you want to delete list?'
    })

    return onOk
  }

  return { handleClick, handleListDelete }
}

export default useContainer
