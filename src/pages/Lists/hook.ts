import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { modalComponentsMap } from 'src/components/ModalRoot/modalComponents'
import { accountSelector } from 'src/store/auth/selectors'
import { fetchLists } from 'src/store/createdLists/actions'
import {
  createdListsErrorSelector,
  createdListsLoadingSelector,
  createdListsSelector,
} from 'src/store/createdLists/selectors'
import { showModal } from 'src/store/features/app'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import getParams from 'src/utils/helpers/getParams'

import { ListsHookReturn } from './types'

const useContainer = (): ListsHookReturn => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(accountSelector)
  const lists = useAppSelector(createdListsSelector)
  const loading = useAppSelector(createdListsLoadingSelector)
  const error = useAppSelector(createdListsErrorSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'

  const handlePagination = (page: number) => {
    setSearchParams(getParams({ page }))
  }

  const handleCreateList = () => {
    const onSuccess = () => {
      if (page === '1') {
        dispatch(fetchLists(page))
      } else {
        setSearchParams({})
      }
    }

    dispatch(
      showModal({
        modalProps: { onSuccess },
        modalType: modalComponentsMap.MODAL_CREATE_LIST,
      })
    )

    return onSuccess
  }

  useEffect(() => {
    if (account) {
      dispatch(fetchLists(page))
    }
  }, [account, page, dispatch])

  return { error, handleCreateList, handlePagination, lists, loading }
}

export default useContainer
