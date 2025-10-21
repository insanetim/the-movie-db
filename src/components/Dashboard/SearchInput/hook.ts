import { ChangeEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import getParams from 'src/utils/helpers/getParams'

import { SearchInputHookProps, SearchInputHookReturn } from './types'

const useContainer = ({
  query,
}: SearchInputHookProps): SearchInputHookReturn => {
  const [inputValue, setInputValue] = useState(query)
  const setSearchParams = useSearchParams()[1]

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSearch = (value: string) => {
    setSearchParams(getParams({ search: value.trim() }), { replace: true })
  }

  return { handleChange, handleSearch, inputValue }
}

export default useContainer
