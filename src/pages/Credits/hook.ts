import { addYears } from 'date-fns'
import { groupBy, head, map, pipe, pluck, values } from 'ramda'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'src/hooks/useRedux'
import { IPersonCredit } from 'src/interfaces/person.interface'
import { RootState } from 'src/store'
import { fetchPersonDetails } from 'src/store/personDetails/actions'
import {
  personDetailsErrorSelector,
  personDetailsLoadingSelector,
  personDetailsSelector,
} from 'src/store/personDetails/selectors'
import getIdFromSlug from 'src/utils/helpers/getIdFromSlug'
import getSlug from 'src/utils/helpers/getSlug'

import { CreditsRouteParams, FilterOptions, ICredit } from './types'

const useContainer = () => {
  const { personSlug } = useParams<
    keyof CreditsRouteParams
  >() as CreditsRouteParams
  const dispatch = useAppDispatch()
  const personId = getIdFromSlug(personSlug)
  const person = useSelector((state: RootState) =>
    personDetailsSelector(state, personId)
  )
  const loading = useSelector(personDetailsLoadingSelector)
  const error = useSelector(personDetailsErrorSelector)
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.All)

  const filteredCredits: IPersonCredit[] = useMemo(() => {
    if (person) {
      const crewCredits = pipe(
        groupBy<IPersonCredit>(item => item.id.toString()),
        values,
        map(credits => {
          const jobs = pluck('job', credits as IPersonCredit[]).join(', ')
          return { ...head(credits as IPersonCredit[]), job: jobs }
        })
      )(person.movie_credits.crew) as IPersonCredit[]
      switch (filter) {
        case 'all':
          return [...person.movie_credits.cast, ...crewCredits]
        case 'cast':
          return [...person.movie_credits.cast]
        case 'crew':
          return [...crewCredits]
      }
    }
    return []
  }, [person, filter])

  const dataSource: ICredit[] = useMemo(() => {
    return filteredCredits.map(credit => ({
      key: `${credit.id}-${credit.character || credit.job}`,
      movieSlug: getSlug(credit.id, credit.title),
      posterPath: credit.poster_path,
      releaseDate:
        credit.release_date || addYears(new Date(), 100).toISOString(),
      releaseDateTitle: credit.release_date
        ? new Date(credit.release_date).getFullYear().toString()
        : '—',
      role: credit.character ? `as ${credit.character}` : credit.job || '—',
      title: credit.title,
    }))
  }, [filteredCredits])

  const handleChangeFilter = (filter: FilterOptions) => {
    setFilter(filter)
  }

  useEffect(() => {
    if (!person) {
      dispatch(fetchPersonDetails(personId))
    }
  }, [dispatch, person, personId])

  return { dataSource, error, handleChangeFilter, loading, person, personSlug }
}

export default useContainer
