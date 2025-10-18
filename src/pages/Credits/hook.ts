import { addYears } from 'date-fns'
import { groupBy, head, map, pipe, pluck, values } from 'ramda'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IPersonCredit } from 'src/interfaces/person.interface'
import { useGetPersonDetailsQuery } from 'src/store/features/person'
import errorMessage from 'src/utils/helpers/errorMessage'
import getIdFromSlug from 'src/utils/helpers/getIdFromSlug'
import getSlug from 'src/utils/helpers/getSlug'

import {
  CreditsHookReturn,
  CreditsRouteParams,
  FilterOptions,
  ICredit,
} from './types'

const useContainer = (): CreditsHookReturn => {
  const { personSlug } = useParams<
    keyof CreditsRouteParams
  >() as CreditsRouteParams
  const personId = getIdFromSlug(personSlug)
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.All)

  const { data: person, error, isLoading } = useGetPersonDetailsQuery(personId)

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

  return {
    dataSource,
    error: errorMessage(error),
    handleChangeFilter,
    isLoading,
    person,
    personSlug,
  }
}

export default useContainer
