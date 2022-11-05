import { useNavigate } from 'react-router-dom'

const useContainer = id => {
  const navigate = useNavigate()

  const handleClick = () => navigate(`/movie/${id}`)

  return { handleClick }
}

export default useContainer
