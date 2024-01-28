import { useNavigate } from 'react-router-dom'
import getSlug from 'src/utils/helpers/getSlug'

import { MovieItemHookProps, MovieItemHookReturn } from './types'

const useContainer = ({
  id,
  title,
}: MovieItemHookProps): MovieItemHookReturn => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/movie/${getSlug(id, title)}`)
  }

  return { handleClick }
}

export default useContainer
