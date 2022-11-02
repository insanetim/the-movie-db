import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBrowserHistory } from '@remix-run/router'

import { clearSearch, fetchSearch } from 'src/state/dashboard/actions'
import { searchQuerySelector } from 'src/state/dashboard/selectors'

export const useContainer = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(searchQuerySelector)
  const [currentValue, setCurrentValue] = useState(null)
  const history = createBrowserHistory()

  const handleChange = event => {
    setCurrentValue(event.target.value)
  }

  const handleSearch = value => {
    if (value.trim()) {
      dispatch(fetchSearch({ query: value }))
    } else {
      dispatch(clearSearch())
      history.push('/')
    }
  }

  useEffect(() => {
    setCurrentValue(searchQuery)
  }, [searchQuery])

  return { currentValue, handleChange, handleSearch }
}
