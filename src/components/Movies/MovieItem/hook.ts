import { useNavigate } from 'react-router-dom'

import type { MovieItemHook, MovieItemHookProps } from './types'

const useContainer = ({ movieId }: MovieItemHookProps): MovieItemHook => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/movie/${movieId.toString()}`)
  }

  return { handleClick }
}

export default useContainer
