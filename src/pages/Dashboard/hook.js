import { useSearchParams } from 'react-router-dom'

export const useContainer = () => {
  const [search, setSearch] = useSearchParams()

  return { searchQuery: search.get('search'), setSearch }
}
