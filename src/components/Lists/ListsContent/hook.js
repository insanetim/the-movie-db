import { useDispatch } from 'react-redux'

import { requestLists } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()

  const handleChange = page => {
    dispatch(requestLists(page))
  }

  return { handleChange }
}
