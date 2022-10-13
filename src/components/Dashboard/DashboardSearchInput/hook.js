import { useDispatch, useSelector } from 'react-redux'

import { clearSearch, requestSearch } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()
  const selectQuery = useSelector(state => state.searchQuery)

  const handleSearch = value => {
    if (value.trim()) {
      dispatch(requestSearch({ query: value }))
    } else {
      dispatch(clearSearch())
    }
  }

  return { selectQuery, handleSearch }
}
