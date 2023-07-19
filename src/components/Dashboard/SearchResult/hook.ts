import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { fetchSearch } from 'src/store/dashboard/actions'
import { searchErrorSelector, searchLoadingSelector, searchMoviesSelector } from 'src/store/dashboard/selectors'

import { SearchResultHook, SearchResultHookProps } from './types'

const useContainer = ({ query }: SearchResultHookProps): SearchResultHook => {
  const dispatch = useAppDispatch()
  const movies = useAppSelector(searchMoviesSelector)
  const loading = useAppSelector(searchLoadingSelector)
  const error = useAppSelector(searchErrorSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'

  const handlePagination = (page: number) => {
    setSearchParams(new URLSearchParams({ page: page.toString(), search: query }))
  }

  useEffect(() => {
    dispatch(fetchSearch({ page, query }))
  }, [page, query, dispatch])

  return { error, handlePagination, loading, movies }
}

export default useContainer
