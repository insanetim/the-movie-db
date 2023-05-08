import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import {
  searchErrorSelector,
  searchLoadingSelector,
  searchMoviesSelector,
  searchPageSelector
} from 'src/store/dashboard/selectors'
import { fetchSearch, setSearchPage } from 'src/store/dashboard/actions'
import { SearchResultHook, SearchResultHookProps } from './types'
import usePrevious from 'src/hooks/usePrevious'

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

  return { movies, loading, error, handlePagination }
}

export default useContainer
