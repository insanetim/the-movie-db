import { useNavigate } from 'react-router-dom'
import getSlug from 'src/utils/helpers/getSlug'

import { CreditsItemHookProps, CreditsItemHookReturn } from './types'

const useContainer = ({
  id,
  title,
}: CreditsItemHookProps): CreditsItemHookReturn => {
  const navigate = useNavigate()

  const handleNavigateToPerson = () => {
    navigate(`/person/${getSlug(id, title)}`)
  }

  return { handleNavigateToPerson }
}

export default useContainer
