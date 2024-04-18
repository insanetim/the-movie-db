import { sort } from 'ramda'

import { KnownForHookProps } from './types'

const useContainer = ({
  credits: { cast, crew },
  department,
}: KnownForHookProps) => {
  const items =
    department === 'Acting'
      ? cast
      : crew.filter(item => item.department === department)
  const sortedItems = sort((a, b) => b.popularity - a.popularity, items).slice(
    0,
    12
  )

  return { sortedItems }
}

export default useContainer
