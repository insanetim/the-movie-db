import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'

import { requestTrending } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()
  const trending = useSelector(state => state.trending)

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
