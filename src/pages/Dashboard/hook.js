import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'

import { requestTrending } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(state => state.searchQuery)
  const searchResult = useSelector(state => state.searchResult)
  const trending = useSelector(state => state.trending)

  useEffect(() => {
    if (isEmpty(trending)) {
      dispatch(requestTrending())
    }
  }, [])

  return { searchQuery, searchResult, trending }
}
