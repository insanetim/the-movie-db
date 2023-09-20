import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import type { SearchInputHook, SearchInputHookProps } from './types'

const useContainer = ({ query }: SearchInputHookProps): SearchInputHook => {
  const [inputValue, setInputValue] = useState('')
  const setSearchParams = useSearchParams()[1]
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSearch = (value: string) => {
    if (value.trim()) {
      setSearchParams(new URLSearchParams({ search: value.trim() }))
    } else {
      navigate('/')
    }
  }

  useEffect(() => {
    setInputValue(query)
  }, [query])

  return { handleChange, handleSearch, inputValue }
}

export default useContainer
