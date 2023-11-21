import { ChangeEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import getParams from 'src/utils/helpers/getParams'

import { SearchInputHook, SearchInputHookProps } from './types'

const useContainer = ({ query }: SearchInputHookProps): SearchInputHook => {
  const [inputValue, setInputValue] = useState('')
  const setSearchParams = useSearchParams()[1]

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSearch = (value: string) => {
    setSearchParams(getParams({ search: value.trim() }))
  }

  useEffect(() => {
    setInputValue(query)
  }, [query])

  return { handleChange, handleSearch, inputValue }
}

export default useContainer
