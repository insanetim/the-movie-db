import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchSearch } from 'src/state/dashboard/actions'
import { searchSelector } from 'src/state/dashboard/selectors'

const useContainer = searchQuery => {
  const dispatch = useDispatch()
  const search = useSelector(searchSelector)

  const handlePagination = page => {
    dispatch(fetchSearch({ query: searchQuery, page }))
  }

  useEffect(() => {
    dispatch(fetchSearch({ query: searchQuery }))
  }, [searchQuery])

  return { movies: search, handlePagination }
}

export default useContainer
