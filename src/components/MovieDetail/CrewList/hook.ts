import { groupBy, sort } from 'ramda'
import { ICrew } from 'src/interfaces/movie.interface'

import { CrewListHookProps, CrewListHookReturn } from './types'

const useContainer = ({ crew }: CrewListHookProps): CrewListHookReturn => {
  const groups = groupBy((person: ICrew) => person.department, crew)
  const groupNames = sort(
    (a: string, b: string) => a.localeCompare(b),
    Object.keys(groups)
  )
  const groupedCrew = Object.assign(groups, { groupNames })

  return { groupedCrew }
}

export default useContainer
