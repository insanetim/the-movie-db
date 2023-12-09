import { Modal } from 'antd'
import { MouseEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import useUpdatePage from 'src/hooks/useUpdatePage'
import { deleteList, fetchLists } from 'src/store/lists/actions'
import { listsSelector } from 'src/store/lists/selectors'

import { ListItemHook, ListItemHookProps } from './types'

const useContainer = ({ listId }: ListItemHookProps): ListItemHook => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const lists = useAppSelector(listsSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const { updatePage } = useUpdatePage({
    action: fetchLists(page),
    items: lists?.results,
    page,
    setSearchParams,
  })

  const handleClick = () => {
    navigate(`/list/${listId}`)
  }

  const handleListDelete = (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()

    const onOk = async () => {
      await dispatch(deleteList(listId))
      updatePage()
    }

    Modal.confirm({
      onOk,
      title: 'Do you want to delete list?',
    })

    return onOk
  }

  return { handleClick, handleListDelete }
}

export default useContainer
