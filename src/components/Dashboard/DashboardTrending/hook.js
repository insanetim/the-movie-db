import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'ramda'

import { fetchTrending } from 'src/state/dashboard/actions'
import { trendingSelector } from 'src/state/dashboard/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const trending = useSelector(trendingSelector)

  const handlePagination = page => {
    dispatch(fetchTrending(page))
  }

  useEffect(() => {
    if (isEmpty(trending)) {
      dispatch(fetchTrending())
    }
  }, [])

  return { movies: trending, handlePagination }
}

export default useContainer
