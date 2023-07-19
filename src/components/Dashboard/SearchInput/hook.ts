import { useNavigate, useSearchParams } from 'react-router-dom'

import type { SearchInputHook } from './types'

const useContainer = (): SearchInputHook => {
  const setSearchParams = useSearchParams()[1]
  const navigate = useNavigate()

  const handleSearch = (value: string) => {
    if (value.trim()) {
      setSearchParams(new URLSearchParams({ search: value.trim() }))
    } else {
      navigate('/')
    }
  }

  return { handleSearch }
}

export default useContainer
