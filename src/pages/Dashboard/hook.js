import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { requestTrending } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(state => state.searchQuery)
  const searchResult = useSelector(state => state.searchResult)
  const trending = useSelector(state => state.trending)

  useEffect(() => {
    dispatch(requestTrending(1))
  }, [])

  return { searchQuery, searchResult, trending }
}
