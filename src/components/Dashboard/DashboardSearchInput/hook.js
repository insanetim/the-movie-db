import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearSearch } from 'src/state/dashboard/actions'

const useContainer = searchQuery => {
  const dispatch = useDispatch()
  const [currentValue, setCurrentValue] = useState(searchQuery)
  const navigate = useNavigate()

  const handleChange = event => {
    setCurrentValue(event.target.value)
  }

  const handleSearch = value => {
    if (value.trim()) {
      navigate({ pathname: '/', search: `search=${value}` })
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
