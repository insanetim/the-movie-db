import { useDispatch } from 'react-redux'
import { requestTrending } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()

  const handlePagination = page => {
    dispatch(requestTrending(page))
  }

  return { handlePagination }
}
