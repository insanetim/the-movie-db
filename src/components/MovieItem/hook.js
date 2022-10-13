import { useNavigate } from 'react-router-dom'

export const useContainer = id => {
  const navigate = useNavigate()

  const handleClick = () => navigate(`/movie/${id}`)

  return { handleClick }
}
