import { useDispatch, useSelector } from 'react-redux'

import { requestSearch } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(state => state.searchQuery)

  const handleChange = page => {
    dispatch(requestSearch({ query: searchQuery, page }))
  }

  return { handleChange }
}
