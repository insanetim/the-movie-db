import { useNavigate, useParams } from 'react-router-dom'
import { useGetPersonDetailsQuery } from 'src/store/features/person'
import errorMessage from 'src/utils/helpers/errorMessage'
import getIdFromSlug from 'src/utils/helpers/getIdFromSlug'

import { PersonDetailsHookReturn, PersonDetailsRouteParams } from './types'

const useContainer = (): PersonDetailsHookReturn => {
  const { personSlug } = useParams<
    keyof PersonDetailsRouteParams
  >() as PersonDetailsRouteParams
  const navigate = useNavigate()
  const personId = getIdFromSlug(personSlug)

  const { data: person, error, isLoading } = useGetPersonDetailsQuery(personId)

  const handleGoToCredits = () => {
    navigate('credits')
  }

  return { error: errorMessage(error), handleGoToCredits, isLoading, person }
}

export default useContainer
