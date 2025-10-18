import { useSearchParams } from 'react-router-dom'
import { modalComponentsMap } from 'src/components/ModalRoot/modalComponents'
import { showModal } from 'src/store/features/app'
import { selectAccount } from 'src/store/features/auth'
import {
  ListData,
  useCreateListMutation,
  useGetListsQuery,
} from 'src/store/features/list'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import errorMessage from 'src/utils/helpers/errorMessage'
import getParams from 'src/utils/helpers/getParams'

import { ListsHookReturn } from './types'

const useContainer = (): ListsHookReturn => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(selectAccount)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'

  const [createList] = useCreateListMutation()

  const {
    data: lists,
    error,
    isLoading,
  } = useGetListsQuery(page, { skip: !account })

  const handlePagination = (page: number) => {
    setSearchParams(getParams({ page }))
  }

  const handleCreateList = () => {
    const onSubmit = async (listData: ListData) => {
      await createList(listData)
    }

    dispatch(
      showModal({
        modalProps: { onSubmit },
        modalType: modalComponentsMap.MODAL_CREATE_LIST,
      })
    )

    return { onSubmit }
  }

  return {
    error: errorMessage(error),
    handleCreateList,
    handlePagination,
    isLoading,
    lists,
  }
}

export default useContainer
