import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import isNull from 'src/utils/helpers/isNull'
import { showModal } from 'src/store/app/actions'
import { fetchLists } from 'src/store/lists/actions'
import { accountSelector } from 'src/store/session/selectors'
import { listsSelector, listsLoadingSelector, listsErrorSelector } from 'src/store/lists/selectors'
import type { ListsHook } from './types'

const useContainer = (): ListsHook => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(accountSelector)
  const lists = useAppSelector(listsSelector)
  const loading = useAppSelector(listsLoadingSelector)
  const error = useAppSelector(listsErrorSelector)

  const handlePagination = (page: number) => {
    dispatch(fetchLists(page))
  }

  const handleCreateList = () => {
    dispatch(showModal({ modalType: 'MODAL_CREATE_LIST' }))
  }

  useEffect(() => {
    if (!isNull(account)) {
      dispatch(fetchLists(1))
    }
  }, [account, dispatch])

  return { lists, loading, error, handlePagination, handleCreateList }
}

export default useContainer
