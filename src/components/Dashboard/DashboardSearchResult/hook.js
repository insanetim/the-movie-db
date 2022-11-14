import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import { fetchSearch } from 'src/state/dashboard/actions'
import { searchQuerySelector, searchSelector } from 'src/state/dashboard/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const search = useSelector(searchSelector)
  const searchQuery = useSelector(searchQuerySelector)

  const handlePagination = page => {
    dispatch(fetchSearch({ query: searchQuery, page }))
  }

  useEffect(() => {
    if (R.isEmpty(search)) {
      dispatch(fetchSearch({ query: searchQuery, page: 1 }))
    }
  }, [searchQuery])

  return { movies: search, handlePagination }
}

export default useContainer
