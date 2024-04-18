import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from 'src/hooks/useRedux'
import { RootState } from 'src/store'
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
  const person = useSelector((state: RootState) =>
    personDetailsSelector(state, personId)
  )
  const loading = useSelector(personDetailsLoadingSelector)
  const error = useSelector(personDetailsErrorSelector)

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
