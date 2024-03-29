import { sort } from 'ramda'
import { IPersonCredit } from 'src/interfaces/person.interface'

import { KnownForHookProps } from './types'

const useContainer = ({ credits, knownForDepartment }: KnownForHookProps) => {
  const items =
    knownForDepartment === 'Acting'
      ? credits.cast
      : credits.crew.filter(item => item.department === knownForDepartment)
  const sortedItems = sort<IPersonCredit>(
    (a, b) => b.popularity - a.popularity,
    items
  ).slice(0, 12)

  return { sortedItems }
}

export default useContainer
