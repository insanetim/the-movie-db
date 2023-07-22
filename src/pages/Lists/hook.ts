import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import useRequest from 'src/hooks/useRequest'
import { showModal } from 'src/store/app/actions'
import { fetchLists } from 'src/store/lists/actions'
import { listsSelector } from 'src/store/lists/selectors'
import { accountSelector } from 'src/store/session/selectors'
import isNull from 'src/utils/helpers/isNull'

import type { ListsHook } from './types'

const useContainer = (): ListsHook => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(accountSelector)
  const lists = useAppSelector(listsSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const { error, loading, request } = useRequest()

  const handlePagination = (page: number) => {
    setSearchParams(new URLSearchParams({ page: page.toString() }))
  }

  const handleCreateList = () => {
    dispatch(showModal({ modalType: 'MODAL_CREATE_LIST' }))
  }

  useEffect(() => {
    if (!isNull(account)) {
      request(fetchLists(page))
    }
  }, [account, page, request])

  return { error, handleCreateList, handlePagination, lists, loading }
}

export default useContainer
