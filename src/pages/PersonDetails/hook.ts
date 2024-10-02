import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { fetchPersonDetails } from 'src/store/personDetails/actions'
import {
  personDetailsErrorSelector,
  personDetailsLoadingSelector,
  personDetailsSelector,
} from 'src/store/personDetails/selectors'
import getIdFromSlug from 'src/utils/helpers/getIdFromSlug'

import { PersonDetailsHookReturn, PersonDetailsRouteParams } from './types'

const useContainer = (): PersonDetailsHookReturn => {
  const { personSlug } = useParams<
    keyof PersonDetailsRouteParams
  >() as PersonDetailsRouteParams
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const personId = getIdFromSlug(personSlug)
  const person = useAppSelector(state => personDetailsSelector(state, personId))
  const loading = useAppSelector(personDetailsLoadingSelector)
  const error = useAppSelector(personDetailsErrorSelector)

  const handleGoToCredits = () => {
    navigate('credits')
  }

  useEffect(() => {
    if (!person) {
      dispatch(fetchPersonDetails(personId))
    }
  }, [dispatch, person, personId])

  return { error, handleGoToCredits, loading, person }
}

export default useContainer
