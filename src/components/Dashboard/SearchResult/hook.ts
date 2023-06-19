import { useEffect } from 'react'
import usePrevious from 'src/hooks/usePrevious'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { fetchSearch, setSearchPage } from 'src/store/dashboard/actions'
import {
  searchErrorSelector,
  searchLoadingSelector,
  searchMoviesSelector,
  searchPageSelector
} from 'src/store/dashboard/selectors'

import { SearchResultHook, SearchResultHookProps } from './types'

const useContainer = ({ query }: SearchResultHookProps): SearchResultHook => {
  const dispatch = useAppDispatch()
  const movies = useAppSelector(searchMoviesSelector)
  const page = useAppSelector(searchPageSelector)
  const loading = useAppSelector(searchLoadingSelector)
  const error = useAppSelector(searchErrorSelector)
  const prevQuery = usePrevious(query)

  const handlePagination = (page: number) => {
    dispatch(setSearchPage(page))
  }

  useEffect(() => {
    if (query !== prevQuery) {
      dispatch(fetchSearch({ page: 1, query }))
    } else {
      dispatch(fetchSearch({ page, query }))
    }
  }, [page, query, prevQuery, dispatch])

  return { error, handlePagination, loading, movies }
}

export default useContainer
