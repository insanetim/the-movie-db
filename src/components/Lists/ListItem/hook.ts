import { Modal } from 'antd'
import { MouseEvent } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from 'src/hooks/useRedux'
import useUpdatePage from 'src/hooks/useUpdatePage'
import { deleteList, fetchLists } from 'src/store/createdLists/actions'
import { createdListsSelector } from 'src/store/createdLists/selectors'
import getSlug from 'src/utils/helpers/getSlug'

import { ListItemHookProps, ListItemHookReturn } from './types'

const useContainer = ({ id, name }: ListItemHookProps): ListItemHookReturn => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const lists = useSelector(createdListsSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const { updatePage } = useUpdatePage({
    action: fetchLists(page),
    items: lists?.results,
    page,
    setSearchParams,
  })

  const handleClick = () => {
    navigate(`/list/${getSlug(id, name)}`)
  }

  const handleListDelete = (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()

    const onOk = async () => {
      await dispatch(deleteList(id))
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
