import { useDispatch } from 'react-redux'
import { requestTrending } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()

  const handleChange = page => {
    dispatch(requestTrending(page))
  }

  return { handleChange }
}
