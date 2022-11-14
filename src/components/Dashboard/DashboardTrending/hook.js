import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import { fetchTrending } from 'src/state/dashboard/actions'
import { trendingSelector } from 'src/state/dashboard/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const trending = useSelector(trendingSelector)

  const handlePagination = page => {
    dispatch(fetchTrending(page))
  }

  useEffect(() => {
    if (R.isEmpty(trending)) {
      dispatch(fetchTrending(1))
    }
  }, [])

  return { movies: trending, handlePagination }
}

export default useContainer
