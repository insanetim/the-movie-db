import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { clearSearch, fetchSearch } from 'src/state/dashboard/actions'
import { searchQuerySelector } from 'src/state/dashboard/selectors'
import { useNavigate } from 'react-router-dom'

const useContainer = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(searchQuerySelector)
  const [currentValue, setCurrentValue] = useState(null)
  const navigate = useNavigate()

  const handleChange = event => {
    setCurrentValue(event.target.value)
  }

  const handleSearch = value => {
    if (value.trim()) {
      dispatch(fetchSearch({ query: value }))
      navigate({ search: `search=${value}` })
    } else {
      dispatch(clearSearch())
      navigate('/')
    }
  }

  useEffect(() => {
    setCurrentValue(searchQuery)
  }, [searchQuery])

  return { currentValue, handleChange, handleSearch }
}

export default useContainer
