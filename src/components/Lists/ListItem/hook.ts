import { Modal } from 'antd'
import { MouseEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useUpdatePage from 'src/hooks/useUpdatePage'
import { createdListsSelector } from 'src/store/createdLists/selectors'
import { useDeleteListMutation } from 'src/store/features/lists'
import { useAppSelector } from 'src/store/hooks'
import getSlug from 'src/utils/helpers/getSlug'

import { ListItemHookProps, ListItemHookReturn } from './types'

const useContainer = ({
  listId: id,
  name,
}: ListItemHookProps): ListItemHookReturn => {
  const navigate = useNavigate()
  const lists = useAppSelector(createdListsSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const { updatePage } = useUpdatePage({
    items: lists?.results,
    page,
    setSearchParams,
  })

  const [deleteList] = useDeleteListMutation()

  const handleClick = () => {
    navigate(`/list/${getSlug(id, name)}`)
  }

  const handleListDelete = (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()

    const onOk = async () => {
      await deleteList(id)
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
