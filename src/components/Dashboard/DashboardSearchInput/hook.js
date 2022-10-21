import { useDispatch } from 'react-redux'

import { clearSearch, requestSearch } from 'src/store/actions'

export const useContainer = setSearch => {
  const dispatch = useDispatch()

  const handleSearch = value => {
    if (value.trim()) {
      dispatch(requestSearch({ query: value }))
      setSearch({ search: value })
    } else {
      dispatch(clearSearch())
      setSearch({})
    }
  }

  return { handleSearch }
}
