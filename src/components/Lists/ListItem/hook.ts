import { Modal } from 'antd'
import { MouseEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useUpdatePage from 'src/hooks/useUpdatePage'
import {
  useDeleteListMutation,
  useGetListsQuery,
} from 'src/store/features/list'
import getSlug from 'src/utils/helpers/getSlug'

import { ListItemHookProps, ListItemHookReturn } from './types'

const useContainer = ({
  listId: id,
  name,
}: ListItemHookProps): ListItemHookReturn => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'

  const { data: lists } = useGetListsQuery(page)
  const [deleteList] = useDeleteListMutation()

  const { updatePage } = useUpdatePage({
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
