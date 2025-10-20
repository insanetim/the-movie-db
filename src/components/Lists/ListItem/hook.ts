import { Modal } from 'antd'
import { MouseEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useHandleError from 'src/hooks/useHandleError'
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
  const { handleError } = useHandleError()

  const { data: lists } = useGetListsQuery(page)
  const [deleteList] = useDeleteListMutation()

  const { updatePage } = useUpdatePage({
    items: lists?.results,
    page,
    setSearchParams,
  })

  const handleNavigateToList = () => {
    navigate(`/list/${getSlug(id, name)}`)
  }

  const handleDeleteList = async () => {
    try {
      await deleteList(id).unwrap()
      updatePage()
    } catch (error) {
      handleError(error)
    }
  }

  const handleConfirmDeleteList = (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()

    Modal.confirm({
      onOk: () => handleDeleteList(),
      title: 'Do you want to delete list?',
    })
  }

  return { handleConfirmDeleteList, handleDeleteList, handleNavigateToList }
}

export default useContainer
