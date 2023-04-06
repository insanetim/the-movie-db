import { useNavigate } from 'react-router-dom'

const useContainer = ({ movieId }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/movie/${movieId}`)
  }

  return { handleClick }
}

export default useContainer
