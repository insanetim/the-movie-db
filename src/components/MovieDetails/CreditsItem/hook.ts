import { useNavigate } from 'react-router-dom'
import getSlug from 'src/utils/helpers/getSlug'

import { CreditsItemHookProps, CreditsItemHookReturn } from './types'

const useContainer = ({
  id,
  title,
}: CreditsItemHookProps): CreditsItemHookReturn => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/person/${getSlug(id, title)}`)
  }

  return { handleClick }
}

export default useContainer
