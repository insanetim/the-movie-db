import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchSearch, setSearchPage } from 'src/state/dashboard/actions'
import {
  searchMoviesSelector,
  searchPageSelector,
  searchLoadingSelector,
  searchErrorSelector
} from 'src/state/dashboard/selectors'

const useContainer = searchQuery => {
  const dispatch = useDispatch()
  const movies = useSelector(searchMoviesSelector)
  const page = useSelector(searchPageSelector)
  const loading = useSelector(searchLoadingSelector)
  const error = useSelector(searchErrorSelector)

  const handlePagination = nextPage => {
    dispatch(setSearchPage(nextPage))
  }

  useEffect(() => {
    dispatch(fetchSearch({ query: searchQuery, page }))
  }, [searchQuery, page])

  return { movies, loading, error, handlePagination }
}

export default useContainer
