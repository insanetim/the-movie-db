import { useLocation } from 'react-router-dom'

const useContainer = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const searchQuery = params.get('search')

  return { searchQuery }
}

export default useContainer
