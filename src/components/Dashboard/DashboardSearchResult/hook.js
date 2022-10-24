import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'

import { requestSearch } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(state => state.searchQuery)
  const search = useSelector(state => state.search)

  const handlePagination = page => {
    dispatch(requestSearch({ query: searchQuery, page }))
  }

  useEffect(() => {
    if (isEmpty(search)) {
      dispatch(requestSearch({ query: searchQuery }))
    }
  }, [searchQuery])

  return { movies: search, handlePagination }
}
