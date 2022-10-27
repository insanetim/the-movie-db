import { useDispatch } from 'react-redux'

import { requestLists } from 'src/state/lists/actions'

export const useContainer = () => {
  const dispatch = useDispatch()

  const handlePaginationChange = page => {
    dispatch(requestLists(page))
  }

  return { handlePaginationChange }
}
