import { isNotNil } from 'ramda'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { showModal } from 'src/store/app/actions'
import { accountSelector } from 'src/store/auth/selectors'
import { fetchLists } from 'src/store/lists/actions'
import {
  listsErrorSelector,
  listsLoadingSelector,
  listsSelector,
} from 'src/store/lists/selectors'
import getParams from 'src/utils/helpers/getParams'

import { ListsHook } from './types'

const useContainer = (): ListsHook => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(accountSelector)
  const lists = useAppSelector(listsSelector)
  const loading = useAppSelector(listsLoadingSelector)
  const error = useAppSelector(listsErrorSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'

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
        modalType: 'MODAL_CREATE_LIST',
      })
    )

    return onSuccess
  }

  useEffect(() => {
    if (isNotNil(account)) {
      dispatch(fetchLists(page))
    }
  }, [account, page, dispatch])

  return { error, handleCreateList, handlePagination, lists, loading }
}

export default useContainer
