import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { createBrowserHistory } from '@remix-run/router'

import { setSearchQuery } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(state => state.searchQuery)
  const location = useLocation()
  const history = createBrowserHistory()

  useEffect(() => {
    if (!searchQuery) {
      const params = new URLSearchParams(location.search)
      dispatch(setSearchQuery(params.get('search')))
    } else {
      history.push({
        search: `search=${searchQuery}`
      })
    }
  }, [location])

  return { searchQuery }
}
