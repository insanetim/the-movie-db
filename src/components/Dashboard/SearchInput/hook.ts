import { ChangeEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import type { SearchInputHook, SearchInputHookProps } from './types'

const useContainer = ({ query }: SearchInputHookProps): SearchInputHook => {
  const [inputValue, setInputValue] = useState('')
  const setSearchParams = useSearchParams({ search: query })[1]

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSearch = (value: string) => {
    const params: Record<string, string> = {}
    if (value.trim()) {
      params.search = value.trim()
    }
    setSearchParams(params)
  }

  useEffect(() => {
    setInputValue(query)
  }, [query])

  return { handleChange, handleSearch, inputValue }
}

export default useContainer
