import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'

import { requestTrending } from 'src/state/dashboard/actions'
import { trendingSelector } from 'src/state/dashboard/selectors'

export const useContainer = () => {
  const dispatch = useDispatch()
  const trending = useSelector(trendingSelector)

  const handlePagination = page => {
    dispatch(requestTrending(page))
  }

  useEffect(() => {
    if (isEmpty(trending)) {
      dispatch(requestTrending())
    }
  }, [])

  return { movies: trending, handlePagination }
}
