import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useContainer = ({ searchQuery }) => {
  const [currentValue, setCurrentValue] = useState(searchQuery)
  const navigate = useNavigate()

  const handleChange = event => {
    setCurrentValue(event.target.value)
  }

  const handleSearch = value => {
    if (value.trim()) {
      navigate({ pathname: '/', search: `search=${value}` })
    } else {
      navigate('/')
    }
  }

  useEffect(() => {
    setCurrentValue(searchQuery)
  }, [searchQuery])

  return { currentValue, handleChange, handleSearch }
}

export default useContainer
