import { useSearchParams } from 'react-router-dom'
import { modalTypes } from 'src/components/ModalsRoot/modalComponents'
import useHandleError from 'src/hooks/useHandleError'
import useModal from 'src/hooks/useModal'
import { selectAccount } from 'src/store/features/auth'
import {
  ListData,
  useCreateListMutation,
  useGetListsQuery,
} from 'src/store/features/list'
import { useAppSelector } from 'src/store/hooks'
import errorMessage from 'src/utils/helpers/errorMessage'
import getParams from 'src/utils/helpers/getParams'

import { ListsHookReturn } from './types'

const useContainer = (): ListsHookReturn => {
  const { handleError } = useHandleError()
  const account = useAppSelector(selectAccount)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const { closeModal, openModal } = useModal()

  const [createList] = useCreateListMutation()

  const {
    data: lists,
    error,
    isLoading,
  } = useGetListsQuery(page, { skip: !account })

  const handlePagination = (page: number) => {
    setSearchParams(getParams({ page }))
  }

  const handleCreateList = async (listData: ListData) => {
    try {
      await createList(listData).unwrap()
    } catch (error) {
      handleError(error)
    }
  }

  const handleOpenCreateListModal = () => {
    openModal({
      modalProps: { closeModal, onSubmit: handleCreateList },
      modalType: modalTypes.CREATE_LIST,
    })
  }

  return {
    error: errorMessage(error),
    handleCreateList,
    handleOpenCreateListModal,
    handlePagination,
    isLoading,
    lists,
  }
}

export default useContainer
