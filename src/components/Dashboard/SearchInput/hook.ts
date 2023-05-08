import { useState, useEffect, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import type { SearchInputHook, SearchInputHookProps } from './types'

const useContainer = ({ query }: SearchInputHookProps): SearchInputHook => {
  const [currentValue, setCurrentValue] = useState(query)
  const navigate = useNavigate()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value)
  }

  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate({ pathname: '/', search: `search=${value}` })
    } else {
      navigate('/')
    }
  }

  useEffect(() => {
    setCurrentValue(query)
  }, [query])

  return { currentValue, handleChange, handleSearch }
}

export default useContainer
