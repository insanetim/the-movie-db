import { useDispatch, useSelector } from 'react-redux'
import { createBrowserHistory } from '@remix-run/router'

import { clearSearch, requestSearch } from 'src/store/actions'
import { useState, useEffect } from 'react'

export const useContainer = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(state => state.searchQuery)
  const [currentValue, setCurrentValue] = useState(null)
  const history = createBrowserHistory()

  const handleChange = event => {
    setCurrentValue(event.target.value)
  }

  const handleSearch = value => {
    if (value.trim()) {
      dispatch(requestSearch({ query: value }))
      history.push({
        search: `search=${value}`
      })
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
