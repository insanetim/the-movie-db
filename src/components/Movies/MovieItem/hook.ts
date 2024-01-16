import { useNavigate } from 'react-router-dom'

import { MovieItemHookProps, MovieItemHookReturn } from './types'

const useContainer = ({ id }: MovieItemHookProps): MovieItemHookReturn => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/movie/${id}`)
  }

  return { handleClick }
}

export default useContainer
