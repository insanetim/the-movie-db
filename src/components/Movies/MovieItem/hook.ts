import { useNavigate } from 'react-router-dom'

import { MovieItemHook, MovieItemHookProps } from './types'

const useContainer = ({ id }: MovieItemHookProps): MovieItemHook => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/movie/${id}`)
  }

  return { handleClick }
}

export default useContainer
