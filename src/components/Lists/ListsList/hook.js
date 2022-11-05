import { useDispatch } from 'react-redux'

import { fetchLists } from 'src/state/lists/actions'

const useContainer = () => {
  const dispatch = useDispatch()

  const handlePaginationChange = page => {
    dispatch(fetchLists(page))
  }

  return { handlePaginationChange }
}

export default useContainer
