import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { setSearchQuery } from 'src/state/dashboard/actions'
import { searchQuerySelector } from 'src/state/dashboard/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(searchQuerySelector)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!searchQuery) {
      const params = new URLSearchParams(location.search)
      dispatch(setSearchQuery(params.get('search')))
    } else {
      navigate({ search: `search=${searchQuery}` })
    }
  }, [])

  return { searchQuery }
}

export default useContainer
